class SortingParams {
  constructor() {
    this.sort = {};
  }

  static convert(query) {
    const sortingParams = new SortingParams();
    if (query.order && query.orderBy) {
      sortingParams.sort[query.orderBy] = query.order === "asc" ? 1 : -1;
    }
    return sortingParams;
  }
}

module.exports = SortingParams;
