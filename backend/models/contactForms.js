
import mongoose from "mongoose";
import { generateUniqueRefNumber } from "../middleware/GenerateId.js";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required:[true,"Please provide a name"]
  },
  email: {
    type: String,
    required:[true,"Please provide a email"]
  },
  company: {
    type: String,
    required:[true,"Please provide a company"]
  },
  phone: {
    type: String,
    required:[true,"Please provide a phone"]
  },
  message: {
    type: String,
    required:[true,"Please provide a message"]
  },
  refNumber: {
    type: String,
    unique:true
  },
}, {
  timestamps: true, 
});

schema.pre('save', async function (next) {
  if (this.isNew || !this.refNumber) {
    const uniqueRefNumber = await generateUniqueRefNumber();
    this.refNumber = uniqueRefNumber;
  }
  next();
});

export const Contacts = mongoose.model('Contacts', schema);


