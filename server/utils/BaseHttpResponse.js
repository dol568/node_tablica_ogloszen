const { StatusCodes } = require("http-status-codes");

class BaseHttpResponse {
  constructor(data = [], error = null, statusCode = StatusCodes.OK) {
    this.data = data;
    this.error = error;
    this.statusCode = statusCode;
  }

  success = (data, statusCode = StatusCodes.OK) => {
    return new BaseHttpResponse(data, null, statusCode);
  };

  failed = (error, statusCode = StatusCodes.BAD_REQUEST) => {
    return new BaseHttpResponse(null, error, statusCode);
  };
}

module.exports = BaseHttpResponse;
