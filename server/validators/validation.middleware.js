const { validationResult } = require("express-validator");
const ValidationException = require("./exceptions/ValidationException");
const catchAsync = require("../middleware/catchAsync");

const validateMiddleware = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = {};
  errors.array().forEach((err) => {
    if (!extractedErrors[err.path]) {
      extractedErrors[err.path] = "";
    }

    if (extractedErrors[err.path]) {
      extractedErrors[err.path] += ", ";
    }
    extractedErrors[err.path] += err.msg;
  });
  throw new ValidationException(extractedErrors);
});

module.exports = validateMiddleware;
