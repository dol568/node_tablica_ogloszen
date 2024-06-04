const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middleware/catchAsync");

class CommentsController {
  constructor(commentsService, baseHttpResponse) {
    this.commentsService = commentsService;
    this.baseHttpResponse = baseHttpResponse;
  }

  getAllComments = catchAsync(async (req, res) => {
    const foundComments = await this.commentsService.getAllComments(req.params.advertisementId, req.query);

    const response = this.baseHttpResponse.success(foundComments);
    res.status(response.statusCode).send(response);
  });

  createComment = catchAsync(async (req, res) => {
    const savedComment = await this.commentsService.createComment(req.body, req.params.advertisementId, req.user.id);

    const response = this.baseHttpResponse.success(savedComment, StatusCodes.CREATED);
    res.status(response.statusCode).send(response);
  });

  updateComment = catchAsync(async (req, res) => {
    const updatedComment = await this.commentsService.updateComment(req.body, req.params, req.user.id);

    const response = this.baseHttpResponse.success(updatedComment);
    res.status(response.statusCode).send(response);
  });
  deleteComment = catchAsync(async (req, res) => {
    await this.commentsService.deleteComment(req.params, req.user.id);

    const response = this.baseHttpResponse.success({});
    res.status(response.statusCode).send(response);
  });
  likeComment = catchAsync(async (req, res) => {
    await this.commentsService.likeComment(req.params, req.user.id);

    const response = this.baseHttpResponse.success({});
    res.status(response.statusCode).send(response);
  });
  dislikeComment = catchAsync(async (req, res) => {
    await this.commentsService.dislikeComment(req.params, req.user.id);

    const response = this.baseHttpResponse.success({});
    res.status(response.statusCode).send(response);
  });
}

module.exports = CommentsController;
