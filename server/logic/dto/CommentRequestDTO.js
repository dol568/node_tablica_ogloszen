class CommentRequestDTO {
  constructor() {
    this.content = "";
    this.rating = 0;
    this._author = "";
    this._advertisement = "";
  }

  static convert(comment, userId, advertisementId, existingComment = {}) {
    const commentDTO = new CommentRequestDTO();
    commentDTO.content = comment.content || existingComment.content;
    commentDTO.rating = comment.rating || existingComment.rating;
    commentDTO._author = existingComment._author ? existingComment._author._id : userId;
    commentDTO._advertisement = existingComment._advertisement ? existingComment._advertisement : advertisementId;
    return commentDTO;
  }
}

module.exports = CommentRequestDTO;
