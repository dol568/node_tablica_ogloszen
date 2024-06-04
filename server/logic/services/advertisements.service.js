const AdvertisementRequestDTO = require("../dto/AdvertisementRequestDTO");
const NotFoundException = require("../exceptions/NotFoundException");
const ForbiddenException = require("../exceptions/ForbiddenException");
const AdvertisementResponseDTO = require("../dto/AdvertisementResponseDTO");
const AdvertisementsResponseDTO = require("../dto/AdvertisementsResponseDTO");
const PaginationParams = require("../dto/PaginationParams");
const FilteringParams = require("../dto/FilteringParams");
const SortingParams = require("../dto/SortingParams");

class AdvertisementsService {
  constructor(advertisementsRepository, constants) {
    this.advertisementsRepository = advertisementsRepository;
    this.constants = constants;
  }

  getAllAdvertisements = async (queryParams) => {
    const pagination = PaginationParams.convert(queryParams);
    const filter = FilteringParams.convert(queryParams);
    const sort = SortingParams.convert(queryParams);

    const response = await this.advertisementsRepository.getAllAdvertisements(pagination, filter, sort);
    return AdvertisementsResponseDTO.convert(response);
  };

  getAllTags = async () => {
    return await this.advertisementsRepository.getAllTags();
  };

  getAllCategories = async () => {
    return await this.advertisementsRepository.getAllCategories();
  };

  getAdvertisementById = async (id) => {
    const response = await this._getAdvertisementById(id);
    return AdvertisementResponseDTO.convert(response);
  };

  createAdvertisement = async (advertisementData, userId) => {
    const advertisementDTO = AdvertisementRequestDTO.convert(advertisementData, userId);
    const response = await this.advertisementsRepository.createAdvertisement(advertisementDTO);
    return AdvertisementResponseDTO.convert(response);
  };

  updateAdvertisement = async (advertisementData, id, userId) => {
    const foundAdvertisement = await this._getAdvertisementById(id, userId);
    const advertisementDTO = AdvertisementRequestDTO.convert(advertisementData, userId, foundAdvertisement);
    const response = await this.advertisementsRepository.updateAdvertisement(advertisementDTO, id);
    return AdvertisementResponseDTO.convert(response);
  };

  deleteAdvertisement = async (id, userId) => {
    await this._getAdvertisementById(id, userId);
    return await this.advertisementsRepository.deleteAdvertisement(id);
  };

  checkIfTitleExists = async (title) => {
    return await this.advertisementsRepository.getAdvertisementByTitle(title);
  };

  _getAdvertisementById = async (id, userId = null) => {
    const foundAdvertisement = await this.advertisementsRepository.getAdvertisementById(id);
    if (!foundAdvertisement) {
      throw new NotFoundException({ entity: this.constants.ADVERTISEMENT, id });
    }
    if (userId && !foundAdvertisement._author._id.equals(userId)) {
      throw new ForbiddenException({ entity: this.constants.ADVERTISEMENT, id, userId });
    }
    return foundAdvertisement;
  };
}

module.exports = AdvertisementsService;
