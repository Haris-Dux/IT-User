
import express from "express";
import {createContact, generatePDFController, getAllForms } from "../controllers/contactFormsController.js";


const contactFormRouter = express.Router();

contactFormRouter.post("/getAllForms",getAllForms);
contactFormRouter.post('/createContact', createContact);
contactFormRouter.post('/generatePDF', generatePDFController);


export default contactFormRouter;



