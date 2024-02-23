import mongoose from "mongoose";
import { generateUniqueOrderNumber } from "../middleware/GenerateId.js";

const ProjectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: [true, 'Project Title is required.'],
  },
  companyName: {
    type: String,
    required: [true, 'Company Name is required.'],
  },
  logoFile: {
    downloadURL: { type: String },
    name: { type: String },
    type: { type: String },
  },
  attachmentFile: {
    downloadURL: { type: String },
    name: { type: String },
    type: { type: String },
  },
  startDate: {
    type: Date,
    required: [true, 'Start Date is required.'],
  },
  Deadline: {
    type: Date,
    required: [true, 'End Date is required.'],
  },
  additionalNote: {
    type:String
  },
  customerId:{
    type:String,
    required: [true, 'End Date is required.'],
  },
  orderId:{
    type:String,
    unique:true
  }
});

ProjectSchema.pre('save',async function (next) {
 if ( this.isNew || !this.orderId ) {
  const uniqueOrderNumber = await generateUniqueOrderNumber();
  this.orderId = uniqueOrderNumber;
 }
 next();
})

export const Project = mongoose.model('Project Orders', ProjectSchema);
