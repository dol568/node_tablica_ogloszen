const { Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const data = require("../../bin/data");

const advertisementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "An advertisement must have a title"],
      unique: true,
      trim: true,
      maxlength: [60, "An advertisement title must be at most 60 characters"],
      minlength: [10, "An advertisement title must be at least 10 characters"],
    },
    slug: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "An advertisement must have a category"],
      enum: {
        values: ["bussiness", "education", "service", "shopping", "volunteering", "other"],
        message: "Category is either: bussiness, education, service, shopping, volunteering, other",
      },
    },
    content: {
      type: String,
      trim: true,
      required: [true, "An advertisement must have a content"],
      minlength: [10, "An advertisement content must be at least 10 characters"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      validate: {
        validator: (tags) => {
          return tags && tags.length > 0;
        },
        message: "At least one tag is required.",
      },
      enum: data.tags,
    },
    price: {
      type: Number,
      required: [true, "An advertisement must have a price"],
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
  },
  { timestamps: true}
);

// advertisementSchema.set("toJSON", { virtuals: true });

// advertisementSchema.virtual("_comments", {
//   ref: "Comment",
//   foreignField: "_advertisement",
//   localField: "_id",
// });

advertisementSchema.pre(/^find/, function (next) {
  this.populate([{ path: "_author", select: { "name.first": 1, "name.last": 1 } }]);
  next();
});

advertisementSchema.pre("save", function (next) {
  this.slug = this.title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-z0-9-]/g, "");
  next();
});

advertisementSchema.plugin(mongoosePaginate);

module.exports = advertisementSchema;
