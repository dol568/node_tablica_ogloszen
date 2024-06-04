const CommentRequestDTO = require("../dto/CommentRequestDTO");
const NotFoundException = require("../exceptions/NotFoundException");
const MismatchException = require("../exceptions/MismatchException");
const ForbiddenException = require("../exceptions/ForbiddenException");
const CommentsResponseDTO = require("../dto/CommentsResponseDTO");
const CommentResponseDTO = require("../dto/CommentResponseDTO");
const PaginationParams = require("../dto/PaginationParams");

class CommentsService {
  constructor(commentsRepository, advertisementsRepository, commentsLikesRepository, constants) {
    this.commentsRepository = commentsRepository;
    this.advertisementsRepository = advertisementsRepository;
    this.commentsLikesRepository = commentsLikesRepository;
    this.constants = constants;
  }

  getAllComments = async (id, queryParams) => {
    const pagination = PaginationParams.convert(queryParams);

    const response = await this.commentsRepository.getAllComments(id, pagination);
    return CommentsResponseDTO.convert(response);
  };

  createComment = async (commentData, advertisementId, userId) => {
    await this._getAdvertisement(advertisementId);
    const commentDTO = CommentRequestDTO.convert(commentData, userId, advertisementId);
    const response = await this.commentsRepository.createComment(commentDTO);

    return CommentResponseDTO.convert(response);
  };

  updateComment = async (commentData, params, userId) => {
    const { advertisementId, commentId } = params;
    const foundComment = await this._getComment(advertisementId, commentId, userId);
    const commentDTO = CommentRequestDTO.convert(commentData, userId, advertisementId, foundComment);
    const response = await this.commentsRepository.updateComment(commentDTO, commentId);

    return CommentResponseDTO.convert(response);
  };

  deleteComment = async (params, userId) => {
    const { advertisementId, commentId } = params;
    await this._getComment(advertisementId, commentId, userId);

    return await this.commentsRepository.deleteComment(commentId);
  };

  likeComment = async (params, userId) => {
    await this._toggleCommentLike(params, userId, true);
  };

  dislikeComment = async (params, userId) => {
    await this._toggleCommentLike(params, userId, false);
  };

  _toggleCommentLike = async (params, userId, liked) => {
    const { advertisementId, commentId } = params;
    await this._getComment(advertisementId, commentId);

    const foundCommentLike = await this.commentsLikesRepository.getOne(commentId, userId);
    const newCommentLike = {
      liked,
      _author: userId,
      _comment: commentId,
    };

    if (!foundCommentLike) {
      await this.commentsLikesRepository.giveLikeOrDislike(newCommentLike);
    } else {
      if (foundCommentLike.liked !== liked) {
        await this.commentsLikesRepository.updateLikeOrDislike(foundCommentLike);
      } else {
        await this.commentsLikesRepository.deleteLike(foundCommentLike._id);
      }
    }
  };

  _getAdvertisement = async (id) => {
    const foundAdvertisement = await this.advertisementsRepository.getAdvertisementById(id);
    if (!foundAdvertisement) {
      throw new NotFoundException({ entity: this.constants.ADVERTISEMENT, id });
    }
    return foundAdvertisement;
  };

  _getComment = async (advertisementId, commentId, userId = null) => {
    const foundAdvertisement = await this._getAdvertisement(advertisementId);
    const foundComment = await this.commentsRepository.getOneComment(commentId);
    if (!foundComment) {
      throw new NotFoundException({ entity: this.constants.COMMENT, id: commentId });
    }
    if (!foundComment._advertisement.equals(foundAdvertisement._id)) {
      throw new MismatchException({ commentId, advertisementId });
    }
    if (userId && !foundComment._author._id.equals(userId)) {
      throw new ForbiddenException({ entity: this.constants.COMMENT, id: commentId, userId });
    }
    return foundComment;
  };
}

module.exports = CommentsService;
