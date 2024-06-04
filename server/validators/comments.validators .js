const { body, param, query } = require("express-validator");
const validate = require("./validation.middleware");

class CommentsValidationService {
  validateCommentId = [param("commentId").isMongoId().withMessage("Comment id should be a valid id"), validate];

  validateCreateComment = [
    body("content")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Content is required")
      .isString()
      .withMessage("Content should be string")
      .isLength({ min: 10 })
      .withMessage("Content should be at least 10 characters"),
    body("rating")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Rating is required")
      .isInt({ min: 1, max: 5, allow_leading_zeroes: false })
      .withMessage("Rating should be a number between 1 & 5"),
    validate,
  ];

  validateUpdateComment = [
    body("content")
      .trim()
      .optional()
      .isString()
      .withMessage("Content should be string")
      .isLength({ min: 10 })
      .withMessage("Content should be at least 10 characters"),
    body("rating")
      .trim()
      .optional()
      .isInt({ min: 1, max: 5, allow_leading_zeroes: false })
      .withMessage("Rating should be a number between 1 & 5"),
    validate,
  ];

  validateCommentQuery = [
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

module.exports = CommentsValidationService;
