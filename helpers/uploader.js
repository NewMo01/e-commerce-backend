const multer = require("multer");
const AppError = require("../helpers/app_error");

const filter = (req, file, cb) => {
  const type = file.mimetype.split('/')[0];
  if (type == "image") {
    cb(null, true);
  } else {
    cb(AppError.create("fail", 400, { msg: "invalid file type" }), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, "image-" + Date.now() + "." + ext);
  },
});

module.exports = multer({
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024, files: 5 },
  fileFilter: filter,
});
