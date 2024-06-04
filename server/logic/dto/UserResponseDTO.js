class UserResponseDTO {
  constructor(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  static convert(entity) {
    return new UserResponseDTO(entity._id, entity.name.first, entity.name.last, entity.email);
  }
}

module.exports = UserResponseDTO;
