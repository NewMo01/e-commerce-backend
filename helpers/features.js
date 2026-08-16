module.exports = class ApiFeatures {
  #mongoQuery;
  constructor(model, reqQuery, anotherFindQuery = {}) {
    this.reqQuery = reqQuery;
    this.#mongoQuery = model.find(anotherFindQuery);
  }

  filter() {
    //cleaning query
    const exclutions = ["sort", "limit", "page", "fields", "keyword"];
    let query = { ...this.reqQuery };
    exclutions.forEach((i) => delete query[i]);

    // filter less or greater
    let queryStr = JSON.stringify(query);
    //"{price:{lt:200}}"=>{price:{$lt:200}}
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (m) => `$${m}`);
    query = JSON.parse(queryStr);

    this.#mongoQuery = this.#mongoQuery.find(query);
    return this;
  }

  search(isProduct = false) {
    const query = {};
    if (this.reqQuery.keyword) {
      isProduct
        ? (query.$or = [
            { title: { $regex: this.reqQuery.keyword, $options: "i" } },
            { description: { $regex: this.reqQuery.keyword, $options: "i" } },
          ])
        : (query.name = { $regex: this.reqQuery.keyword, $options: "i" });

      this.#mongoQuery = this.#mongoQuery.find(query);
    }

    return this;
  }

  sort() {
    const sortBy = this.reqQuery.sort?.replaceAll(",", " ");

    this.#mongoQuery = this.#mongoQuery.sort(sortBy ? sortBy : "-createdAt");
    return this;
  }

  paginate(l = 10, p = 1) {
    const limit = +this.reqQuery.limit || l;
    const page = +this.reqQuery.page || p;
    const skip = (page - 1) * limit;

    this.#mongoQuery = this.#mongoQuery.skip(skip).limit(limit);
    return this;
  }

  select() {
    const fields = this.reqQuery.fields?.replaceAll(",", " ");
    this.#mongoQuery = this.#mongoQuery.select(fields);
    return this;
  }

  get mongoQuery() {
    return this.#mongoQuery;
  }
};
