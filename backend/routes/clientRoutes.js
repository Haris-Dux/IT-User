import express from "express";
import {
  authClient,
  forgotPassword,
  login,
  logout,
  resetPassword,
  sendOtp,
  signUp,
  updateClient,
  verifyOtp,
} from "../controllers/clientController.js";
import { verifyClient } from "../middleware/AuthClient.js";

const clientRouter = express.Router();

clientRouter.post("/signup", signUp);
clientRouter.post("/login", login);
clientRouter.delete("/logout",verifyClient,logout);
clientRouter.post("/updateClient",updateClient);
clientRouter.post("/forgotPassword",forgotPassword);
clientRouter.post("/resetPassword",resetPassword);
clientRouter.post("/authClientSessionEverytime",authClient);
clientRouter.post("/sendOtp",sendOtp);
clientRouter.post("/verifyOtp",verifyOtp);

export default clientRouter;
