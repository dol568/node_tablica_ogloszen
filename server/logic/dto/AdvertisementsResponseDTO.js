const AdvertisementResponseDTO = require("./AdvertisementResponseDTO");

class AdvertisementsResponseDTO {
  static convert(entities) {
    return { ...entities, docs: entities.docs.map((e) => AdvertisementResponseDTO.convert(e)) };
  }
}

module.exports = AdvertisementsResponseDTO;
