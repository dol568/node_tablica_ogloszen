const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentLikeSchema = new Schema(
  {
    _comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    _author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    liked: {
      type: Boolean,
      required: [true, "CommentLike must be true or false"],
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = commentLikeSchema;
