const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/../public/hotels/"));
  },

  filename: (req, file, cb) => {
    cb(
      null,
      "hotel" + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploader = multer({ storage }).any();

module.exports = {
  uploader,
};
