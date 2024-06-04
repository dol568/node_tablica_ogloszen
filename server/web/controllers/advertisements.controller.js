const { textPlainResponse, textHtmlResponse } = require("../helpers/customResponse");
const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middleware/catchAsync");
const NotAcceptableException = require("../exceptions/NotAcceptableException");

class AdvertisementsController {
  constructor(advertisementsService, baseHttpResponse) {
    this.advertisementsService = advertisementsService;
    this.baseHttpResponse = baseHttpResponse;
  }

  getAllAdvertisements = catchAsync(async (req, res) => {
    const results = await this.advertisementsService.getAllAdvertisements(req.query);

    const response = this.baseHttpResponse.success(results);
    res.status(response.statusCode).send(response);
  });

  getAllTags = catchAsync(async (req, res) => {
    const results = await this.advertisementsService.getAllTags();

    const response = this.baseHttpResponse.success(results);
    res.status(response.statusCode).send(response);
  });

  getAllCategories = catchAsync(async (req, res) => {
    const results = await this.advertisementsService.getAllCategories();

    const response = this.baseHttpResponse.success(results);
    res.status(response.statusCode).send(response);
  });

  getAdvertisementById = catchAsync(async (req, res) => {
    const advertisement = await this.advertisementsService.getAdvertisementById(req.params.advertisementId);
    res.format({
      "text/plain": () => {
        const plainResponse = textPlainResponse(advertisement);
        res.status(StatusCodes.OK).send(plainResponse);
      },

      "text/html": () => {
        const htmlResponse = textHtmlResponse(advertisement);
        res.status(StatusCodes.OK).send(htmlResponse);
      },

      "application/json": () => {
        const response = this.baseHttpResponse.success(advertisement);
        res.status(response.statusCode).send(response);
      },

      default: () => {
        throw new NotAcceptableException();
      },
    });
  });

  createAdvertisement = catchAsync(async (req, res) => {
    const savedAdvertisement = await this.advertisementsService.createAdvertisement(req.body, req.user.id);
    const response = this.baseHttpResponse.success(savedAdvertisement, StatusCodes.CREATED);
    res.status(response.statusCode).send(response);
  });

  updateAdvertisement = catchAsync(async (req, res) => {
    const updatedAd = await this.advertisementsService.updateAdvertisement(
      req.body,
      req.params.advertisementId,
      req.user.id
    );

    const response = this.baseHttpResponse.success(updatedAd);
    res.status(response.statusCode).send(response);
  });

  deleteAdvertisement = catchAsync(async (req, res) => {
    await this.advertisementsService.deleteAdvertisement(req.params.advertisementId, req.user.id);

    const response = this.baseHttpResponse.success({});
    res.status(response.statusCode).send(response);
  });
}

module.exports = AdvertisementsController;
