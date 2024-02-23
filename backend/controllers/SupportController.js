import { uploadFileToFirebase } from "../assets/firebase.js";
import { sendEmail } from "../assets/nodemailer.js";
import { Support } from "../models/SupportModel.js";

export const createSupport = async (req, res) => {
  try {
    const { departmentName, message, ticketNumber, customerId , email } = req.body;
    const file = req.file;

    let fileData = null;
    if (file) {
      const result = await uploadFileToFirebase(file, "Support Files");
      console.log(result);
      fileData = {
        downloadURL: result.downloadURL,
        name: result.name,
        type: result.type,
      };
    }

    const data = await Support.create({
      departmentName,
      message,
      ticketNumber,
      customerId,
      file:fileData
    });

    await sendEmail( {email, emailType: "SUPPORT" , ticketNumber:data.ticketNumber})

    return res.status(201).json({msg: "Successfully Submitted",data});
  } catch (error) {
    return res.status(400).json({msg:error.message});
  }
};

