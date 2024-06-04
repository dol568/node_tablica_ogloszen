class AdvertisementsRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  getAllAdvertisements = async (pagination, filter, sort) => {
    const options = {
      ...sort,
      page: pagination.page,
      limit: pagination.limit,
      collation: { locale: "en", strength: 2 },
    };
    return this.dataSource.advertisement.paginate(filter, options);
  };

  getAdvertisementById = async (id) => {
    return this.dataSource.advertisement.findOne({ _id: id, isActive: true });
  };

  getAdvertisementByTitle = async (title) => {
    return this.dataSource.advertisement.findOne({ title, isActive: true });
  };

  createAdvertisement = async (advertisement) => {
    const newAdvertisement = new this.dataSource.advertisement(advertisement);
    return newAdvertisement.save();
  };

  updateAdvertisement = async (advertisement, id) => {
    return this.dataSource.advertisement.findByIdAndUpdate(id, advertisement, { new: true });
  };

  deleteAdvertisement = async (id) => {
    const deletedAd = await this.dataSource.advertisement.findByIdAndUpdate(
      id,
      { isActive: false, deletedAt: Date.now(), title: "deleted" + Date.now() },
      { new: true }
    );
    await this.dataSource.comment.updateMany({ _advertisement: id }, { isActive: false, deletedAt: Date.now() });
    return deletedAd;
  };

  getAllTags = async () => {
    return this.dataSource.advertisement.schema.path("tags").caster.enumValues;
  };

  getAllCategories = async () => {
    return this.dataSource.advertisement.schema.path("category").enumValues;
  };
}

module.exports = AdvertisementsRepository;
