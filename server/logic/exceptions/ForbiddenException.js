class ForbiddenException extends Error {
  constructor(message) {
    super(`User with id '${message.userId}' is not the author of ${message.entity} with id '${message.id}'`);
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ForbiddenException;
