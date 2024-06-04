const catchAsync = require("../../middleware/catchAsync");

class UsersController {
  constructor(usersService, baseHttpResponse) {
    this.usersService = usersService;
    this.baseHttpResponse = baseHttpResponse;
  }

  getAllUsers = catchAsync(async (req, res) => {
    const foundUsers = await this.usersService.getAllUsers(req.query);

    const response = this.baseHttpResponse.success(foundUsers);
    res.status(response.statusCode).send(response);
  });

  getUserById = catchAsync(async (req, res) => {
    const foundUser = await this.usersService.getUserById(req.params.userId);

    const response = this.baseHttpResponse.success(foundUser);
    res.status(response.statusCode).send(response);
  });
}

module.exports = UsersController;
