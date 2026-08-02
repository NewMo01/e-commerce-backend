module.exports = class ApiFeatures {
  #mongoQuery;
  constructor(model, reqQuery) {
    this.model = model;
    this.reqQuery = reqQuery;
    this.#mongoQuery = model.find();
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

  search() {
    const query = {};
    if (this.reqQuery.keyword) {
      query.$or = [
        { title: { $regex: this.reqQuery.keyword, $options: "i" } },
        { description: { $regex: this.reqQuery.keyword, $options: "i" } },
      ];
    }
    this.#mongoQuery = this.#mongoQuery.find(query);
    return this;
  }

  sort() {
    const sortBy = this.reqQuery.sort?.replaceAll(",", " ");

    this.#mongoQuery = this.#mongoQuery.sort(sortBy ? sortBy : "-createdAt");
    return this;
  }

  paginate() {
    const limit = +this.reqQuery.limit || 10;
    const page = +this.reqQuery.page || 1;
    const skip = (page - 1) * limit;

    this.#mongoQuery = this.#mongoQuery.skip(skip).limit(limit);
    return this;
  }

  select() {
    const fields = this.reqQuery.fields?.replaceAll(",", " ");
    this.#mongoQuery = this.#mongoQuery.select(fields);
    return this
  }

  get getQuery(){return this.#mongoQuery}
};
