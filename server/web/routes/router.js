const express = require("express");

class Router {
  constructor(usersRouter, authRouter, advertisementsRouter, constants) {
    this.constants = constants;
    this.router = express.Router();

    this.router.use(this.constants.AUTH_URL, authRouter);
    this.router.use(this.constants.USERS_URL, usersRouter);
    this.router.use(this.constants.ADVERTISEMENTS_URL, advertisementsRouter);

    this.router.get(this.constants.HEARTBEAT_URL, (req, res, next) => {
      try {
        const currentDate = new Date().toString();
        res.json(currentDate);
      } catch (error) {
        next(error);
      }
    });
    return this.router;
  }
}

module.exports = Router;
