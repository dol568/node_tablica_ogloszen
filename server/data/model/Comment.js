const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Comment must have a content"],
      trim: true,
      minlength: [10, "Comment content must be at least 10 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Comment must have a rating"],
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    _author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    _advertisement: {
      type: Schema.Types.ObjectId,
      ref: "Advertisement",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

commentSchema.virtual("_likes", {
  ref: "CommentLike",
  foreignField: "_comment",
  localField: "_id",
});

commentSchema.pre(/^find/, function (next) {
  this.populate([{ path: "_likes" },
   { path: "_author", select: { "name.first": 1, "name.last": 1 } }
  ]);
  next();
});

commentSchema.statics.calcAverageRatings = async function (id, model) {
  const stats = await this.aggregate([
    {
      $match: { _advertisement: id, isActive: true },
    },
    {
      $group: {
        _id: "$_advertisement",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await model.findByIdAndUpdate(id, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await model.findByIdAndUpdate(id, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

commentSchema.plugin(mongoosePaginate);

module.exports = commentSchema;
