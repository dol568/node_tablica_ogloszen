const NotFoundException = require("../exceptions/NotFoundException");
const UserResponseDTO = require("../dto/UserResponseDTO");
const UsersResponseDTO = require("../dto/UsersResponseDTO");
const PaginationParams = require("../dto/PaginationParams");

class UsersService {
  constructor(usersRepository, constants) {
    this.usersRepository = usersRepository;
    this.constants = constants;
  }

  getAllUsers = async (queryParams) => {
    const pagination = PaginationParams.convert(queryParams);
    const result = await this.usersRepository.getAllUsers(pagination);
    return UsersResponseDTO.convert(result);
  };

  getUserById = async (id) => {
    const result = await this.usersRepository.getUserById(id);
    if (!result) {
      throw new NotFoundException({ entity: this.constants.USER, id });
    }
    return UserResponseDTO.convert(result);
  };

  getUserByEmail = async (email) => {
    const result = await this.usersRepository.getUserByEmail(email);
    if (!result) {
      throw new NotFoundException({ entity: this.constants.USER, email });
    }
    return UserResponseDTO.convert(result);
  };
}

module.exports = UsersService;
