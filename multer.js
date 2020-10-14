var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/ecards');
  },
  filename: (req, file, cb) => {
    let extension = file.mimetype.split("/");
    cb(null, 'image' + '-' + Date.now() + '.' + extension[1]);
  }
});

module.exports = {
  storage: storage
}
