module.exports = (req, res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === "string") {
      // Trim whitespace
      const trimmed = req.body[key].trim();
      // If empty after trimming, set to null
      req.body[key] = trimmed === "" ? null : trimmed;
    }
  }

  next();
};
