
import express from 'express';
import { getInvoicesById, updateInvoice } from '../controllers/invoiceController.js';

const invoiceRouter = express.Router();

invoiceRouter.post("/getInvoicesById",getInvoicesById);
invoiceRouter.post("/updateInvoice",updateInvoice);


export default invoiceRouter;