import express from 'express';
import { save, show, allData, updateData, drop, destdata, usersNames } from '../controllers/post_contorl.js';
import { upload } from '../utils/multerToHandelUpload.js';

const router = express.Router();

router.post('/', upload.single('image'), save);
router.get('/:id', show);
router.get('/', allData);
router.patch('/:id', upload.single('image'), updateData);
router.delete('/:id', drop);
router.get('/destination/search', destdata);
router.get('/users/names', usersNames);

export default router;
