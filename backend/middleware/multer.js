const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const singleUpload = multer({ storage }).single("file");

module.exports = singleUpload;

