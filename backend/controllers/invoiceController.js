import mongoose from "mongoose";
import { MainDocument } from "../models/invoiceModel.js";
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

export const getInvoicesById = async (req,res) => {
  try {
    const {customerId} = req.body;
    const projects = await MainDocument.find({customerId});
    setMongoose();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({msg:error.message})
  }
};

export const updateInvoice = async (req, res, next) => {
  const {
    id,
    invoiceId,
    to,
    service,
    paymentStatus,
    status,
    amount,
    discount,
    customerId,
    orderId,
    dueDate,
    secondInvoiceDueDate,
  } = req.body;
 try {
  let updateQuery = {};
  if (to) {
    updateQuery = { ...updateQuery, to };
  }
  if (service) {
    updateQuery = { ...updateQuery, service };
  }
  if (paymentStatus) {
    updateQuery = { ...updateQuery, paymentStatus };
  }
  if (status) {
    updateQuery = { ...updateQuery, status };
  }
  if (amount) {
    updateQuery = { ...updateQuery, amount };
  }
  if (discount) {
    updateQuery = { ...updateQuery, discount };
  }
  if (amount) {
    updateQuery = { ...updateQuery, amount };
  }
  if (customerId) {
    updateQuery = { ...updateQuery, customerId };
  }
  if (orderId) {
    updateQuery = { ...updateQuery, orderId };
  }
  if (dueDate) {
    updateQuery = { ...updateQuery, dueDate };
  }
  if (secondInvoiceDueDate) {
    updateQuery = { ...updateQuery, secondInvoiceDueDate };
  }

 
  const mainDocument = await MainDocument.findById(id);
  
  if (!mainDocument) {
    return res.status(404).json({ msg: "MainDocument not found" });
  }

    if (invoiceId) {
      const invoiceToUpdate = mainDocument.invoices.find(
        (invoice) => invoice._id.toString() === invoiceId
      );

      if (!invoiceToUpdate) {
        return res.status(404).json({ msg: "Invoice not found" });
      }

      Object.assign(invoiceToUpdate, updateQuery);
      await mainDocument.save();

      Object.assign(mainDocument, updateQuery);
      await mainDocument.save();

      // Update payment status of the corresponding project
      if (paymentStatus) {
        const project = await Projects.findOne({ orderId: orderId });
        if (project) {
         await Projects.findOneAndUpdate(
          {orderId: orderId},
          {paymentStatus:paymentStatus},
          {upsert: true, new: true, setDefaultsOnInsert: true}
        )
         
        }
      }

      return res.status(200).json({ msg: "Invoice Updated" });
    } else {
      // Update only MainDocument 
      Object.assign(mainDocument, updateQuery);
      await mainDocument.save();

      // Update payment status of the corresponding project
      if (paymentStatus) {
        const project = await Projects.findOne({ orderId: orderId });
        if (project) {
          await Projects.findOneAndUpdate(
            {orderId: orderId},
            {paymentStatus:paymentStatus},
            {upsert: true, new: true, setDefaultsOnInsert: true}

          )
        }
      }
      
      return res.status(200).json({ msg: "Invoice Updated" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



