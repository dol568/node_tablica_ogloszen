const { body, query, param } = require("express-validator");
const validate = require("./validation.middleware");

class UsersValidationService {
  validateUserId = [param("userId").isMongoId().withMessage("User id should be a valid id"), validate];

  validateLogin = [
    body("username")
      .exists({ checkFalsy: true })
      .withMessage("User name is required")
      .isEmail()
      .withMessage("Provide valid email"),
    body("password")
      .exists({ checkFalsy: true })
      .withMessage("Password is required")
      .isAlphanumeric()
      .withMessage("Password should contain only numbers and letters"),
    validate,
  ];

  validateUsersQuery = [
    query("page")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Page should not be empty")
      .isInt({ min: 1 })
      .withMessage("Page should be a number higher than 0"),
    query("limit")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Limit should not be empty")
      .isInt({ min: 1 })
      .withMessage("Limit should be a number higher than 0"),
    validate,
  ];
}

module.exports = UsersValidationService;
