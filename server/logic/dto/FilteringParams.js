class FilteringParams {
  constructor() {
    this.title = undefined;
    this.content = undefined;
    this.category = undefined;
    this.tags = undefined;
    this.price = undefined;
    this.updatedAt = undefined;
    this._author = undefined;
    this.isActive = true;
  }

  static convert(query) {
    const filteringParams = new FilteringParams();
    if (query.title) {
      filteringParams.title = { $regex: query.title, $options: "i" };
    }
    if (query.content) {
      filteringParams.content = { $regex: query.content, $options: "i" };
    }
    if (query.category) {
      filteringParams.category = { $regex: query.category, $options: "i" };
    }
    if (query.tags) {
      filteringParams.tags = { $all: query.tags };
    }
    if (query.minPrice || query.maxPrice) {
      filteringParams.price = {};
      if (query.minPrice) {
        filteringParams.price.$gte = parseFloat(query.minPrice);
      }
      if (query.maxPrice) {
        filteringParams.price.$lte = parseFloat(query.maxPrice);
      }
    }
    if (query.fromDate || query.toDate) {
      filteringParams.updatedAt = {};
      if (query.fromDate) {
        filteringParams.updatedAt.$gte = new Date(query.fromDate);
      }
      if (query.toDate) {
        filteringParams.updatedAt.$lt = new Date(query.toDate);
      }
    }
    if (query.author) {
      filteringParams._author = query.author;
    }

    Object.keys(filteringParams).forEach(key => {
        if (filteringParams[key] === undefined) {
            delete filteringParams[key]
        }
        return filteringParams;
    })

    return filteringParams;
  }
}

module.exports = FilteringParams;
