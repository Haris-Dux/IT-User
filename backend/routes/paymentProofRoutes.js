import express from "express";
import { submitPaymentProof } from "../controllers/paymentProofController.js";

const paymentProofRouter = express.Router();

paymentProofRouter.post("/submitpaymentProof",submitPaymentProof);

export default paymentProofRouter;