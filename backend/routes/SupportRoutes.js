import express from 'express';
import { createSupport } from '../controllers/SupportController.js';
import multer from 'multer';


const upload = multer({ storage: multer.memoryStorage() });
const supportRouter = express.Router();

supportRouter.post("/createSupport", upload.single("filename"),createSupport);

export default supportRouter;



