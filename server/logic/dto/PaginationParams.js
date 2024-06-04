class PaginationParams {
  constructor() {
    this.page = 1;
    this.limit = 5;
  }

  static convert(query) {
    const paginationParams = new PaginationParams();
    paginationParams.page = query.page ? parseInt(query.page, 10) : paginationParams.page;
    paginationParams.limit = query.limit ? parseInt(query.limit, 10) : paginationParams.limit;

    return paginationParams;
  }
}

module.exports = PaginationParams;
