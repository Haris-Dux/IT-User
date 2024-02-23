
import mongoose from "mongoose";
import { Contacts } from "../models/contactForms.js";
import { sendEmail } from "../assets/nodemailer.js";
import generatePDF from "../assets/puppeteer.js";

function setMongoose() {
  return mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, returnValue) => {
      delete returnValue._id;
      delete returnValue.__v;
    },
  });
}


export const getAllForms = async (req, res, next) => {
  try {
    const allFormData = await Contacts.find({})
    .sort({createdAt: -1})
    setMongoose();
    res.status(200).json(allFormData);
  } catch (error) {
    res.status(500).json({ msg:error.message});
  }
};

export const createContact = async (req, res) => {
  try {

    const { name, email, company, phone, message , refNumber } = req.body;
   
    if (!name || !email || !company || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    };

    const newContact = new Contacts({ name, email, company, phone, message , refNumber});
    const data = await newContact.save();

    await sendEmail({name, email, refNumber:data.refNumber , emailType:"CONTACTFORM" });

     res.status(201).json({message:"Success",refNumber:data.refNumber});
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
};

export const generatePDFController = async (req, res, next) => {
  try {
    const { formData } = req.body;
    const data = await generatePDF(formData);

    // Set the headers from the data returned by generatePDF
    Object.entries(data.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Send the PDF buffer
    res.status(200).send(data.pdfBuffer);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}






