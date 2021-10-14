const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now());
    },
  });

module.exports = storage