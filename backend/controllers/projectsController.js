
import mongoose from "mongoose";
import { Projects } from "../models/projectsModel.js";

function setMongoose() {
  return mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, returnValue) => {
      delete returnValue._id;
      delete returnValue.__v;
    },
  });
}

export const getProjectsById = async (req,res) => {
  try {
    const {customerId} = req.body;
    const projects = await Projects.find({customerId}).sort({createdAt: -1});
    setMongoose();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({msg:error.message})
  }
};