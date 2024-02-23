import { Project } from "../models/ProjectOrderModel.js";
import { Support } from "../models/SupportModel.js";
import { Clients } from "../models/clientModel.js";
import { Contacts } from "../models/contactForms.js";

async function generateUniqueCustomerId() {
  const prefix = "ITE-";
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const candidateCustomerId = `${prefix}${randomSuffix}`;
  const existingUser = await Clients.findOne({
    customerId: candidateCustomerId,
  });
  if (existingUser) {
    return generateUniqueCustomerId();
  }
  return candidateCustomerId;
}

async function generateUniqueRefNumber() {
  const prefix = "ITE-";
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const generatedRefNumber = `${prefix}${randomSuffix}`;
  const existingRefNumber = await Contacts.findOne({
    refNumber: generatedRefNumber,
  });
  if (existingRefNumber) {
    return generateUniqueCustomerId();
  }
  return generatedRefNumber;
}

async function generateUniqueTicketNumber() {
  const prefix = "ITE-";
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const generatedTicketNumber = `${prefix}${randomSuffix}`;
  const existingRefNumber = await Support.findOne({
    ticketNumber: generatedTicketNumber,
  });
  if (existingRefNumber) {
    return generateUniqueTicketNumber();
  }
  return generatedTicketNumber;
}

async function generateUniqueOrderNumber() {
  const prefix = "ITE-";
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const generatedOrderNumber = `${prefix}${randomSuffix}`;
  const existingOrderNumber = await Project.findOne({
    orderId: generatedOrderNumber,
  });
  if (existingOrderNumber) {
    return generateUniqueOrderNumber();
  }
  return generatedOrderNumber;
}

export {
  generateUniqueCustomerId,
  generateUniqueRefNumber,
  generateUniqueTicketNumber,
  generateUniqueOrderNumber
};
