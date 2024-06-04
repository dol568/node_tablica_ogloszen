class PathNotFoundException extends Error {
  constructor(message) {
    super(`This path ${message} isn't on this server!`);
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = PathNotFoundException;
