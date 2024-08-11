import express from 'express';
import { sendNotification } from '../controllers/notify_controller.js'; // Adjust the path as needed

const router = express.Router();

router.post('/send', sendNotification);

export default router;
