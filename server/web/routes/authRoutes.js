const express = require("express");

class AuthRouter {
  constructor(usersValidation, authController) {
    this.router = express.Router();
    this.usersValidation = usersValidation;
    this.authController = authController;

    this.router.post("/login", this.usersValidation.validateLogin, this.authController.login);
    this.router.post("/logout", this.authController.logout);
    return this.router;
  }
}

module.exports = AuthRouter;
