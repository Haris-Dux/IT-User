import { uploadImageToCloudinary } from "../assets/cloudinary.js";
import { MainDocument } from "../models/invoiceModel.js";
import { PaymentProof } from "../models/paymentProofModel.js";

export const submitPaymentProof = async (req, res, next) => {
  try {
    const { accountUsed, image, mainDocumentId, invoiceId , clientData } = req.body;

    if (!accountUsed || !image || !invoiceId || !mainDocumentId) {
      return res.status(404).json({ msg: "Invalid Data" });
    }

    const result = await uploadImageToCloudinary(image, "Payment Proofs");
    const imageData = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };

    const mainDocument = await MainDocument.findOne({ _id: mainDocumentId });
    if(!mainDocument){
       throw new Error('Invoice Not Found')
    };

    const data = {
        name:mainDocument.invoices[0].to.name,
        customerId:mainDocument.customerId,
        orderId:mainDocument.orderId
    };
    
    await PaymentProof.create({
        accountUsed,
        image:imageData,
        mainDocumentId,
        invoiceId,
        clientData:data,
        mainDocumentData:mainDocument
    })
    return res.status(201).json({msg:"Submission Sucessfull"});
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
