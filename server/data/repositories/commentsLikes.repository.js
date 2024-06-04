class CommentsLikesRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  getOne = async (commentId, authorId) => {
    return this.dataSource.commentLike.findOne({ _comment: commentId, _author: authorId });
  };

  giveLikeOrDislike = async (commentLike) => {
    const like = new this.dataSource.commentLike(commentLike);
    return like.save();
  };

  updateLikeOrDislike = async (commentLike) => {
    return this.dataSource.commentLike.findByIdAndUpdate(
      commentLike._id,
      { $set: { liked: !commentLike.liked } },
      {
        new: true,
      }
    );
  };

  deleteLike = async (id) => {
    await this.dataSource.commentLike.deleteOne({ _id: id });
  };
}

module.exports = CommentsLikesRepository;
