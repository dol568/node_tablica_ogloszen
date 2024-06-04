class CommentResponseDTO {
  constructor(id, rating, content, updatedAt, advertisement, author, likes) {
    this.id = id || undefined;
    this.rating = rating;
    this.content = content;
    this.updatedAt = updatedAt;
    this.advertisement = advertisement;
    this.author = author;
    this.likes = likes;
  }

  static convert(entity) {
    return new CommentResponseDTO(
      entity._id,
      entity.rating,
      entity.content,
      entity.updatedAt,
      entity._advertisement,
      entity._author.name
        ? { firstName: entity._author.name.first, lastName: entity._author.name.last, id: entity._author._id }
        : entity._author._id,
      entity._likes ? entity._likes.map((e) => ({ author: e._author, liked: e.liked })) : []
    );
  }
}

module.exports = CommentResponseDTO;
