const mongoose = require("mongoose");
const userSchema = require("./model/User");
const advertisementSchema = require("./model/Advertisement");
const commentSchema = require("./model/Comment");
const commentLikeSchema = require("./model/CommentLike");
require("dotenv").config();

class DBService {
  constructor() {
    this.database = null;
  }

  connect = async () => {
    try {
      this.database = await mongoose.connect(process.env.CONNECTION_STRING, { dbName: process.env.DATABASE_NAME });
      this.database.model("User", userSchema);
      this.database.model("Advertisement", advertisementSchema);
      this.database.model("Comment", commentSchema);
      this.database.model("CommentLike", commentLikeSchema);

      console.log("DB connection successful!");
    } catch (error) {
      console.error("DB connection error:", error);
      process.exit(1);
    }
  };

  populate = async (usersData, advertisementsData, commentsData) => {
    try {
      await mongoose.connection.dropCollection("commentLikes");
      await mongoose.connection.dropCollection("comments");
      await mongoose.connection.dropCollection("advertisements");
      await mongoose.connection.dropCollection("users");

      await this.user.create(usersData);
      await this.advertisement.create(advertisementsData);
      await this.comment.create(commentsData);
    } catch (error) {
      console.log(error);
    }
  };

  close = () => {
    mongoose.connection.close();
  };

  get user() {
    return this.database.model("User");
  }

  get advertisement() {
    return this.database.model("Advertisement");
  }

  get comment() {
    return this.database.model("Comment");
  }

  get commentLike() {
    return this.database.model("CommentLike");
  }
}

module.exports = DBService;
