class UsersRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  getAllUsers = async (pagination) => {
    const options = { sort: { email: 1 }, page: pagination.page, limit: pagination.limit };
    return await this.dataSource.user.paginate({}, options);
  };

  getUserById = async (id) => {
    return this.dataSource.user.findOne({ _id: id, isActive: true });
  };

  getUserByEmail = async (email) => {
    return this.dataSource.user.findOne({ email, isActive: true });
  };
}

module.exports = UsersRepository;
