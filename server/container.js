const awilix = require("awilix");
const DBService = require("./data/db.service");
const UsersRepository = require("./data/repositories/users.repository");
const AdvertisementsRepository = require("./data/repositories/advertisements.repository");
const CommentsRepository = require("./data/repositories/comments.repository");
const CommentsLikesRepository = require("./data/repositories/commentsLikes.repository");
const UsersService = require("./logic/services/users.service");
const AdvertisementsService = require("./logic/services/advertisements.service");
const CommentsService = require("./logic/services/comments.service");
const UsersController = require("./web/controllers/users.controller");
const AdvertisementsController = require("./web/controllers/advertisements.controller");
const CommentsController = require("./web/controllers/comments.controller");
const AuthController = require("./web/controllers/auth.controller");
const UsersValidationService = require("./validators/users.validators");
const AdvertisementsValidationService = require("./validators/advertisements.validators");
const CommentsValidationService = require("./validators/comments.validators ");
const UsersRouter = require("./web/routes/userRoutes");
const AdvertisementsRouter = require("./web/routes/advertisementRoutes");
const CommentsRouter = require("./web/routes/commentRoutes");
const AuthRouter = require("./web/routes/authRoutes");
const Router = require("./web/routes/router");
const AuthService = require("./logic/services/auth.service");
const BaseHttpResponse = require("./utils/BaseHttpResponse");
const GlobalErrorHandler = require("./middleware/globalErrorHandler");
const constants = require("./utils/constants");

let container = awilix.createContainer({ injectionMode: awilix.InjectionMode.CLASSIC });

container.register({
  dataSource: awilix.asClass(DBService).singleton(),

  usersRepository: awilix.asClass(UsersRepository).singleton(),
  advertisementsRepository: awilix.asClass(AdvertisementsRepository).singleton(),
  commentsRepository: awilix.asClass(CommentsRepository).singleton(),
  commentsLikesRepository: awilix.asClass(CommentsLikesRepository).singleton(),

  usersService: awilix.asClass(UsersService).singleton(),
  advertisementsService: awilix.asClass(AdvertisementsService).singleton(),
  commentsService: awilix.asClass(CommentsService).singleton(),
  authService: awilix.asClass(AuthService).singleton(),

  usersController: awilix.asClass(UsersController).singleton(),
  advertisementsController: awilix.asClass(AdvertisementsController).singleton(),
  commentsController: awilix.asClass(CommentsController).singleton(),
  authController: awilix.asClass(AuthController).singleton(),

  usersValidation: awilix.asClass(UsersValidationService).singleton(),
  advertisementsValidation: awilix.asClass(AdvertisementsValidationService).singleton(),
  commentsValidation: awilix.asClass(CommentsValidationService).singleton(),

  router: awilix.asClass(Router).singleton(),

  usersRouter: awilix.asClass(UsersRouter).singleton(),
  advertisementsRouter: awilix.asClass(AdvertisementsRouter).singleton(),
  commentsRouter: awilix.asClass(CommentsRouter).singleton(),
  authRouter: awilix.asClass(AuthRouter).singleton(),

  baseHttpResponse: awilix.asClass(BaseHttpResponse).singleton(),
  globalErrorHandler: awilix.asClass(GlobalErrorHandler).singleton(),

  constants: awilix.asValue(constants),
});

module.exports = container;
