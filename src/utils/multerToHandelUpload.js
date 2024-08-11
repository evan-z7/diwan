import multer from 'multer';
import moment from 'moment';
import path from 'path';

const MB = 1024 * 1024;
const date = moment().format('YYYY-MM-DD');
//const imagePath = path.join(__dirname, '../../images');
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 4 * MB,
  },
  fileFilter(_req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      cb(new Error('error format'));
    } else {
      cb(null, true);
    }
  },
});

export { upload };
