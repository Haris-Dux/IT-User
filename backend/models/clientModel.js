import mongoose from "mongoose";
import { generateUniqueCustomerId } from "../middleware/GenerateId.js";

const schema = new mongoose.Schema({
    firstName: { type: String, required: [true,"Please provide First Name"] },
    lastName: { type: String, required: [true,"Please provide Last Name"] },
    phoneNumber : { type: Number, required: [true,"Please provide Number"]},
    gender : {type: String, required: [true,"Please provide gender"]},
    dateOfBirth : {type: Date, required: [true,"Please provide date of birth"]},
    email : {type: String, required: [true,"Please provide email"] , unique:true},
    companyName : {type: String, required: [true,"Please provide company name"]},
    address:{type: String, required: [true,"Please provide your address"]},
    nationalId: {type: String, required: [true,"Please provide your national Id"]},
    city: {type: String, required: [true,"Please provide your city"]},
    postalCode : {type: String, required: [true,"Please provide postal code"]},
    drivingLicense : {type: String, required: [true,"Please provide email"]},
    password: {type: String, required: [true,"Please provide password"]},
    customerId: { type: String, unique: true },
    isVerified: {type:Boolean,default:false},
    image:{
      public_id: { type: String },
      secure_url: { type: String },
    }
},{timestamps:true});

mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, returnValue) => {
      delete returnValue._id;
      delete returnValue.__v;
    },
  });

  
  schema.pre('save', async function (next) {
    if (this.isNew || !this.customerId) {
      const uniqueCustomerId = await generateUniqueCustomerId();
      this.customerId = uniqueCustomerId;
    }
    next();
  });

export const Clients = mongoose.model('Clients', schema);