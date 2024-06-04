const CommentResponseDTO = require("./CommentResponseDTO");

class CommentsResponseDTO {
  static convert(entities) {
    return { ...entities, docs: entities.docs.map((e) => CommentResponseDTO.convert(e)) };
  }
}

module.exports = CommentsResponseDTO;
