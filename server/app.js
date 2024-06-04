const fs = require("fs");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
const PathNotFoundException = require("./web/exceptions/PathNotFoundException");
const container = require("./container");
const passport = require("passport");

class App {
  constructor() {
    this.app = express();
    this.globalErrorHandler = container.resolve("globalErrorHandler").middleware;
    container.resolve("authService");
    this.config();
  }

  config() {
    if (process.argv.slice(2)[0] === "debug") {
      this.app.use(
        logger("timestamp: [:date[clf]] method: :method url: :url statusCode: :status", {
          stream: fs.createWriteStream("outputLog.log", { flags: "a" }),
        })
      );
    }

    this.app.use(logger("dev"));

    this.app.use(
      cors({
        origin: "http://localhost:4900",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
      })
    );

    this.app.use(express.static(path.join(__dirname, "public")));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(
      cookieSession({
        name: "app-auth",
        keys: ["secret-new", "secret-old"],
        maxAge: 60 * 60 * 1000,
      })
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use("/", container.resolve("router"));

    this.app.all("*", (req, res, next) => {
      next(new PathNotFoundException(req.originalUrl));
    });

    this.app.use(this.globalErrorHandler);
  }
}

module.exports = new App().app;
