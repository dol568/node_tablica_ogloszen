const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        required: [true, "User must have a first name"],
      },
      last: {
        type: String,
        required: [true, "User must have a last name"],
      },
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      minlength: [3, "Password must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    address: {
      street: {
        type: [String],
      },
      city: String,
      state: String,
      zip: Number,
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
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.plugin(mongoosePaginate);

module.exports = userSchema;
