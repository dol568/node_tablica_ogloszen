const path = require("path");
const NotFoundException = require("../logic/exceptions/NotFoundException");
const { StatusCodes } = require("http-status-codes");
const ForbiddenException = require("../logic/exceptions/ForbiddenException");
const MismatchException = require("../logic/exceptions/MismatchException");
const { MongoError } = require("mongodb");
const ValidationException = require("../validators/exceptions/ValidationException");
const PathNotFoundException = require("../web/exceptions/PathNotFoundException");
const NotAcceptableException = require("../web/exceptions/NotAcceptableException");
const UnauthorizedException = require("../web/exceptions/UnauthorizedException");

class GlobalErrorHandler {
  constructor(baseHttpResponse) {
    this.baseHttpResponse = baseHttpResponse;
  }

  middleware = (err, req, res, next) => {
    console.log("globalhandler");

    console.log({ error: err, message: err.message, stack: err.stack });

    if (err instanceof NotFoundException || err instanceof PathNotFoundException) {
      return res.status(StatusCodes.NOT_FOUND).sendFile("404.png", { root: path.join(__dirname, "../public") });
    }
    if (err instanceof ValidationException) {
      const response = this.baseHttpResponse.failed(err.message, StatusCodes.UNPROCESSABLE_ENTITY);
      return res.status(response.statusCode).send(response);
    }
    if (err instanceof ForbiddenException) {
      const response = this.baseHttpResponse.failed(err.message, StatusCodes.FORBIDDEN);
      return res.status(response.statusCode).send(response);
    }
    if (err instanceof MismatchException) {
      const response = this.baseHttpResponse.failed(err.message);
      return res.status(response.statusCode).send(response);
    }
    if (err instanceof NotAcceptableException) {
      const response = this.baseHttpResponse.failed(err.message, StatusCodes.NOT_ACCEPTABLE);
      return res.status(response.statusCode).send(response);
    }
    if (err instanceof UnauthorizedException) {
      const response = this.baseHttpResponse.failed(err.message, StatusCodes.UNAUTHORIZED);
      return res.status(response.statusCode).send(response);
    }
    if (err.name === "CastError") {
      const message = `Invalid ${err.path}: ${err.value}.`;
      const response = this.baseHttpResponse.failed(message);
      return res.status(response.statusCode).send(response);
    }
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      const message = `Invalid input data. ${errors.join(" ")}`;
      const response = this.baseHttpResponse.failed(message);
      return res.status(response.statusCode).send(response);
    }
    if (err.code === 11000 && err instanceof MongoError) {
      const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
      const message = `Field value:${value} aleady exist. Please use another`;
      const response = this.baseHttpResponse.failed(message);
      return res.status(response.statusCode).send(response);
    }
    if (err instanceof Error) {
      const response = this.baseHttpResponse.failed("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
      return res.status(response.statusCode).send(response);
    }
    next();
  };
}

module.exports = GlobalErrorHandler;
