import mongoose from "mongoose";
import { generateUniqueTicketNumber } from "../middleware/GenerateId.js";

const supportSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: [true, "Department Name is required"],
  },
  file: {
    downloadURL: { type: String },
    name: { type: String },
    type: { type: String },
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  ticketNumber:{
    type : String ,
    unique : true,
  },
  customerId:{
    type : String,
    required: [true, "Message is required"],
  },

});

supportSchema.pre('save', async function (next) {
  if (this.isNew || !this.ticketNumber) {
    const uniqueTicketNumber = await generateUniqueTicketNumber();
    this.ticketNumber = uniqueTicketNumber;
  }
  next();
});

export const Support = mongoose.model("Support", supportSchema);
