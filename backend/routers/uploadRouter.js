import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const diskUpload = multer({ storage: diskStorage });
const memoryUpload = multer({ storage: multer.memoryStorage() });

if (process.env.VERCEL) {
  uploadRouter.post('/', isAuth, memoryUpload.single('image'), (req, res) => {
    res.send('/images/p1.jpg');
  });
} else {
  uploadRouter.post('/', isAuth, diskUpload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
  });
}

export default uploadRouter;
