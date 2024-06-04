const UserResponseDTO = require("./UserResponseDTO");

class UsersResponseDTO {
  static convert(entities) {
    return { ...entities, docs: entities.docs.map((e) => UserResponseDTO.convert(e)) };
  }
}

module.exports = UsersResponseDTO;
