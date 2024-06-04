class MismatchException extends Error {
    constructor(message) {
      super(`Advertisement with id '${message.advertisementId}' does not belong to comment with id '${message.commentId}'`);
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = MismatchException;