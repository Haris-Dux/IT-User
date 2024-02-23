

import express from "express";
import { getProjectsById } from "../controllers/projectsController.js";


const projectsRouter = express.Router();

projectsRouter.post("/getProjectsById",getProjectsById)

export default projectsRouter;