const express = require("express");

class CommentsRouter {
  constructor(usersController, advertisementsValidation, commentsValidation, authController, commentsController) {
    this.router = express.Router({ mergeParams: true });
    this.usersController = usersController;
    this.advertisementsValidation = advertisementsValidation;
    this.commentsValidation = commentsValidation;
    this.authController = authController;
    this.commentsController = commentsController;

    this.router
      .route("/")
      .get(
        this.advertisementsValidation.validateAdvertisementsId,
        this.commentsValidation.validateCommentQuery,
        this.commentsController.getAllComments
      )
      .post(
        this.authController.requireAuth,
        this.advertisementsValidation.validateAdvertisementsId,
        this.commentsValidation.validateCreateComment,
        this.commentsController.createComment
      );

    this.router
      .route("/:commentId")
      .patch(
        this.authController.requireAuth,
        this.advertisementsValidation.validateAdvertisementsId,
        this.commentsValidation.validateCommentId,
        this.commentsValidation.validateUpdateComment,
        this.commentsController.updateComment
      )
      .delete(
        this.authController.requireAuth,
        this.advertisementsValidation.validateAdvertisementsId,
        this.commentsValidation.validateCommentId,
        this.commentsController.deleteComment
      );

    this.router.post(
      "/:commentId/like",
      this.authController.requireAuth,
      this.advertisementsValidation.validateAdvertisementsId,
      this.commentsValidation.validateCommentId,
      this.commentsController.likeComment
    );

    this.router.post(
      "/:commentId/dislike",
      this.authController.requireAuth,
      this.advertisementsValidation.validateAdvertisementsId,
      this.commentsValidation.validateCommentId,
      this.commentsController.dislikeComment
    );

    return this.router;
  }
}

module.exports = CommentsRouter;
