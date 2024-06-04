class NotFoundException extends Error {
  constructor(message) {
    super(
      `${message.entity} with ${message.id ? "id" : "email"} '${message.id ? message.id : message.email}' not found`
    );
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = NotFoundException;
