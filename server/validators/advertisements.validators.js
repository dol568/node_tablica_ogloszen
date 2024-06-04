const data = require("../bin/data");
const { body, param, query } = require("express-validator");
const validate = require("./validation.middleware");

class AdvertisementsValidationService {
  constructor(advertisementsService) {
    this.advertisementsService = advertisementsService;
  }

  validateAdvertisementsId = [
    param("advertisementId").isMongoId().withMessage("Advertisement id should be a valid id"),
    validate,
  ];

  validateCreateAdvertisement = [
    body("title")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Title is required")
      .isString()
      .withMessage("Title should be string")
      .isLength({ min: 10, max: 40 })
      .withMessage("Tile should be between 10 and 40 characters")
      .custom(async (title) => {
        const existingAdvertisement = await this.advertisementsService.checkIfTitleExists(title);
        if (existingAdvertisement) {
          return Promise.reject("An advertisement already exists with this title");
        }
        return true;
      })
      .withMessage("An advertisement already exists with this title"),
    body("category")
      .trim()
      .exists({ checkFalsy: true })
      .isString()
      .withMessage("Category should be string")
      .isIn(data.categories)
      .withMessage(`Category value is invalid (${data.categories})`),
    body("content")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Content is required")
      .isString()
      .withMessage("Content should be string")
      .isLength({ min: 10 })
      .withMessage("Content should be at least 10 characters"),
    body("tags")
      .trim()
      .custom((value) => {
        if (!Array.isArray(value) || value.length === 0) {
          return false;
        }
        for (const tag of value) {
          if (!data.tags.includes(tag)) {
            return false;
          }
        }
        return true;
      })
      .withMessage(`At least one tag is required. Only valid tags allowed (${data.tags})`),
    body("price")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Price is required")
      .isFloat({ gt: 0, allow_leading_zeroes: false })
      .withMessage("Price should be a number and greater than 0"),
    validate,
  ];

  validateUpdateAdvertisement = [
    body("title")
      .trim()
      .optional()
      .isString()
      .withMessage("Title should be string")
      .isLength({ min: 10, max: 60 })
      .withMessage("Tile should be between 10 and 60 characters"),
    body("category")
      .trim()
      .optional()
      .isString()
      .withMessage("Category should be string")
      .isIn(data.categories)
      .withMessage(`Category value is invalid (${data.categories})`),
    body("content")
      .trim()
      .optional()
      .isString()
      .withMessage("Content should be string")
      .isLength({ min: 10 })
      .withMessage("Tile should be at least 10 characters"),
    body("tags")
      .trim()
      .optional()
      .custom((value) => {
        if (!Array.isArray(value) || value.length === 0) {
          return false;
        }
        for (const tag of value) {
          if (!data.tags.includes(tag)) {
            return false;
          }
        }
        return true;
      })
      .withMessage(`At least one tag is required. Only valid tags allowed (${data.tags})`),
    body("price")
      .trim()
      .optional()
      .isFloat({ gt: 0, allow_leading_zeroes: false })
      .withMessage("Price should be a number and greater than 0"),
    validate,
  ];

  validateAdvertisementsQuery = [
    query("title")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Title should not be empty")
      .isString()
      .withMessage("Title should be string"),
    query("category")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Category should not be empty")
      .isString()
      .withMessage("Category should be string")
      .isIn(data.categories)
      .withMessage(`Category value is invalid (${data.categories})`),
    query("content")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Content should not be empty")
      .isString()
      .withMessage("Content should be string"),
    query("minPrice")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Min Price should not be empty")
      .isFloat()
      .withMessage("Min Price should be a number"),
    query("maxPrice")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Max Price should not be empty")
      .isFloat()
      .withMessage("Max Price should be a number"),
    query("fromDate")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("From Date should not be empty")
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage(`From Date must be in the format YYYY-MM-DD`),
    query("toDate")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("To Date should not be empty")
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage(`To Date must be in the format YYYY-MM-DD`),
    query("tags")
      .optional()
      .isArray({ min: 1 })
      .withMessage("Tags should not be empty")
      .custom((value) => {
        if (!Array.isArray(value) || value.length === 0) {
          return false;
        }
        for (const tag of value) {
          if (!data.tags.includes(tag)) {
            return false;
          }
        }
        return true;
      })
      .withMessage(`Only valid tags allowed (${data.tags})`),
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
    query("order")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Order should not be empty")
      .isString()
      .withMessage("Order should be string")
      .isIn(["asc", "desc"])
      .withMessage(`Oder value is invalid (asc, desc)`),
    query("orderBy")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("OrderBy should not be empty")
      .isString()
      .withMessage("OrderBy should be string")
      .isIn(["title", "updatedAt", "price", "category", "ratingsAverage"])
      .withMessage(`OderBy value is invalid (title, updatedAt, price, category, ratingsAverage)`),
    query("author")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Author id should not be empty")
      .isMongoId()
      .withMessage("Author id should be a valid id"),
    validate,
  ];
}

module.exports = AdvertisementsValidationService;
