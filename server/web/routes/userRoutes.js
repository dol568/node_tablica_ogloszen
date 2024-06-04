const express = require("express");

class UsersRouter {
  constructor(usersController, usersValidation) {
    this.router = express.Router();
    this.usersController = usersController;
    this.usersValidation = usersValidation;

    this.router.get("/", this.usersValidation.validateUsersQuery, this.usersController.getAllUsers);

    this.router.get("/:userId", this.usersValidation.validateUserId, this.usersController.getUserById);

    return this.router;
  }
}

module.exports = UsersRouter;
