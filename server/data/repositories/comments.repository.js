class CommentsRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  getAllComments = async (id, pagination) => {
    const query = { _advertisement: id, isActive: true };
    const options = { sort: { updatedAt: -1 }, page: pagination.page, limit: pagination.limit };
    return this.dataSource.comment.paginate(query, options);
  };

  getOneComment = async (id) => {
    return this.dataSource.comment.findOne({ _id: id, isActive: true });
  };

  createComment = async (comment) => {
    const newComment = new this.dataSource.comment(comment);
    const savedAdvertisement = await newComment.save();
    await this.dataSource.comment.calcAverageRatings(savedAdvertisement._advertisement, this.dataSource.advertisement);
    return savedAdvertisement;
  };

  updateComment = async (comment, id) => {
    const updated = await this.dataSource.comment.findByIdAndUpdate(id, comment, { new: true });
    await this.dataSource.comment.calcAverageRatings(updated._advertisement, this.dataSource.advertisement);
    return updated;
  };

  deleteComment = async (id) => {
    const deletedComment = await this.dataSource.comment.findByIdAndUpdate(
      id,
      [{ $set: { isActive: false, deletedAt: Date.now() } }],
      { new: true }
    );

    await this.dataSource.comment.calcAverageRatings(deletedComment._advertisement, this.dataSource.advertisement);
    await this.dataSource.commentLike.deleteMany({ _comment: id });
    return deletedComment;
  };
}

module.exports = CommentsRepository;
