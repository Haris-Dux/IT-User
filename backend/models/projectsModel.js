
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: [true, 'Project Title is required.'],
  },
  companyName: {
    type: String,
    required: [true, 'Company Name is required.'],
  },
  file: {
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
  customerId:{
    type:String,
    required: [true, 'End Date is required.'],
  },
  orderId:{
    type:String,
    unique:true
  },
  amount:{
    type:Number,
    required: [true, 'Amount is required.'],
  },
  paymentStatus:{
    type:String,
    required: [true, 'Payment Status is required.'],
  },
  projectDescription:{
    type:String,
    required: [true, 'Amount is required.'],
  },
  completed:{
    type:Boolean,
    default:false
  },
  projectProgress:{
    title:{
        type:String,
        required: [true, 'Title is required.'],
    },
    description:{
        type:String,
        required: [true, 'Description is required.'],
    }
  }
});

export const Projects = mongoose.model('Projects', ProjectSchema);
 