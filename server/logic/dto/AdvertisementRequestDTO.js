class AdvertisementRequestDTO {
  constructor() {
    this.title = "";
    this.category = "";
    this.content = "";
    this.tags = "";
    this.price = 0;
    this._author = "";
  }

  static convert(advertisement, userId, existingAdvertisement = {}) {
    const advertisementDTO = new AdvertisementRequestDTO();
    advertisementDTO.title = advertisement.title || existingAdvertisement.title;
    advertisementDTO.category = advertisement.category || existingAdvertisement.category;
    advertisementDTO.content = advertisement.content || existingAdvertisement.content;
    advertisementDTO.tags = advertisement.tags || existingAdvertisement.tags;
    advertisementDTO.price = advertisement.price || existingAdvertisement.price;
    advertisementDTO._author = existingAdvertisement._author ? existingAdvertisement._author._id : userId;
    return advertisementDTO;
  }
}

module.exports = AdvertisementRequestDTO;
