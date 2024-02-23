import express from "express";
import { getProjects, getProjectById, updateProject, deleteProject, createProjectOrder } from "../controllers/ProjectOrderController.js";
import multer from 'multer';

// const allowedFileTypes = ['image/png', 'image/jpeg', 'application/pdf', 'application/zip', 'application/msword', 'application/postscript', 'application/illustrator'];

// const fileFilter = (req, file, cb) => {
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Allowed types: png, jpeg, pdf, zip, word, eps, ai.'), false);
//   }
// };

//, fileFilter: fileFilter 
//, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'attachment', maxCount: 1 }])

const upload = multer({ storage: multer.memoryStorage() });
const ProjectOrderRouter = express.Router();

ProjectOrderRouter.post('/createProjectOrder', upload.array("filename", 2) ,createProjectOrder);
ProjectOrderRouter.get('/get', getProjects);
ProjectOrderRouter.get('/:id', getProjectById);
ProjectOrderRouter.put('/:id/update', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'attachment', maxCount: 1 }]), updateProject);
ProjectOrderRouter.delete('/:id/delete', deleteProject);

export default ProjectOrderRouter;
