class ValidationException extends Error {
  constructor(message) {
    super(JSON.stringify(message));
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ValidationException;
