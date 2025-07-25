const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images"),
  filename: (req, file, cb) => {
    const imageFileName = Date.now() + "-" + file.originalname;
    cb(null, imageFileName);
  },
});

const upload = multer({ storage });

module.exports = upload;
