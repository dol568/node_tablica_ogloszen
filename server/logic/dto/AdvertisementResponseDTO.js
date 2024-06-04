class AdvertisementResponseDTO {
  constructor(id, title, category, content, price, tags, ratingsAverage, ratingsQuantity, updatedAt, slug, author) {
    this.id = id || undefined;
    this.title = title;
    this.category = category;
    this.content = content;
    this.price = price;
    this.tags = tags;
    this.ratingsAverage = ratingsAverage;
    this.ratingsQuantity = ratingsQuantity;
    this.updatedAt = updatedAt;
    this.slug = slug;
    this.author = author;
  }

  static convert(entity) {
    return new AdvertisementResponseDTO(
      entity._id,
      entity.title,
      entity.category,
      entity.content,
      entity.price,
      entity.tags,
      entity.ratingsAverage,
      entity.ratingsQuantity,
      entity.updatedAt,
      entity.slug,
      entity._author.name
        ? { firstName: entity._author.name.first, lastName: entity._author.name.last, id: entity._author._id }
        : entity._author._id
    );
  }
}

module.exports = AdvertisementResponseDTO;
