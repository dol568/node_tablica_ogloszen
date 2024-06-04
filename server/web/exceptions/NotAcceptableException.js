class NotAcceptableException extends Error {
  constructor() {
    super("Requested format not supported");
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = NotAcceptableException;