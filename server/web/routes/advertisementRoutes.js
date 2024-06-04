const express = require("express");

class AdvertisementsRouter {
  constructor(commentsRouter, advertisementsValidation, authController, advertisementsController) {
    this.router = express.Router();
    this.authController = authController;
    this.advertisementsValidation = advertisementsValidation;
    this.advertisementsController = advertisementsController;

    this.router.use("/:advertisementId/comments", commentsRouter);

    this.router
      .route("/")
      .get(
        this.advertisementsValidation.validateAdvertisementsQuery,
        this.advertisementsController.getAllAdvertisements
      )
      .post(
        this.authController.requireAuth,
        this.advertisementsValidation.validateCreateAdvertisement,
        this.advertisementsController.createAdvertisement
      );

    this.router.route("/categories").get(this.advertisementsController.getAllCategories);

    this.router.route("/tags").get(this.advertisementsController.getAllTags);

    this.router
      .route("/:advertisementId")
      .get(this.advertisementsValidation.validateAdvertisementsId, this.advertisementsController.getAdvertisementById)
      .patch(
        this.authController.requireAuth,
        this.advertisementsValidation.validateAdvertisementsId,
        this.advertisementsValidation.validateUpdateAdvertisement,
        this.advertisementsController.updateAdvertisement
      )
      .delete(
        this.authController.requireAuth,
        this.advertisementsValidation.validateAdvertisementsId,
        this.advertisementsController.deleteAdvertisement
      );

    return this.router;
  }
}

module.exports = AdvertisementsRouter;
