import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { sendEmail } from "../assets/nodemailer.js";
import mongoose from "mongoose";
import { Clients } from "../models/clientModel.js";
import { OTP } from "../models/otpModel.js";
import {
  validateOneMinuteExpiry,
  validateOtp,
} from "../middleware/OtpValidate.js";
import { uploadImageToCloudinary } from "../assets/cloudinary.js";

const generateOtp = async () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const signUp = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      email,
      companyName,
      address,
      nationalId,
      city,
      postalCode,
      drivingLicense,
      password,
      customerId,
    } = req.body;
    const user = await Clients.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const Clientdata = await Clients.create({
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      email,
      companyName,
      address,
      nationalId,
      city,
      postalCode,
      drivingLicense,
      password: hashedPassword,
      customerId,
    });
    res.status(201).json({ msg: "Registerd SuccessFully", Clientdata });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const user = await Clients.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Invalid Credentials" });
    }
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ verified: false, msg: "Please Verify Your Account" });
    }
    const isMatched = await bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      return res.status(500).json({ msg: "Invalid Credentials" });
    }
    req.session.userId = user.id;
    const {
      id,
      name,
      customerId,
      isVerified,
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      companyName,
      address,
      nationalId,
      city,
      postalCode,
      drivingLicense,
      image
    } = user;
    email = user.email;
    return res
      .status(200)
      .json({
        msg: "Login SuccessFull",
        login: true,
        id,
        name,
        customerId,
        email,
        isVerified,
        firstName,
        lastName,
        phoneNumber,
        gender,
        dateOfBirth,
        companyName,
        address,
        nationalId,
        city,
        postalCode,
        drivingLicense,
        image
      });
  } catch (error) {
    return res.status(500).json({ login: false, error: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy((error) => {
      if (error) return res.status(400).json({ msg: "Logout Unsuccessfull" });
      res.clearCookie("connect.sid");
      res.status(200).json({ msg: "Logout Successfull" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClient = async (req, res, next) => {
  try {
    const {
      id,
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      email,
      newEmail,
      companyName,
      address,
      nationalId,
      city,
      postalCode,
      drivingLicense,
      oldPassword,
      newPassword,
      image,
    } = req.body;

    let updateQuery = {};

    if (!id) {
      return res.status(409).json({ msg: "User id Not found" });
    }
    if (firstName) {
      updateQuery = { ...updateQuery, firstName };
    }
    if (lastName) {
      updateQuery = { ...updateQuery, lastName };
    }
    if (phoneNumber) {
      updateQuery = { ...updateQuery, phoneNumber };
    }
    if (gender) {
      updateQuery = { ...updateQuery, gender };
    }
    if (dateOfBirth) {
      updateQuery = { ...updateQuery, dateOfBirth };
    }
    if (email) {
      const client = await Clients.findOne({ email });
      const verifyNewEmail = await Clients.findOne({ email: newEmail });
      if (!client) {
        res.status(409).json({ msg: "User Not Found" });
      }
      if (verifyNewEmail) {
        return res.status(409).json({ msg: "Email Already in Use" });
      }
      updateQuery = { ...updateQuery, email: newEmail };
    }
    if (companyName) {
      updateQuery = { ...updateQuery, companyName };
    }
    if (nationalId) {
      updateQuery = { ...updateQuery, nationalId };
    }
    if (address) {
      updateQuery = { ...updateQuery, address };
    }
    if (city) {
      updateQuery = { ...updateQuery, city };
    }
    if (postalCode) {
      updateQuery = { ...updateQuery, postalCode };
    }
    if (drivingLicense) {
      updateQuery = { ...updateQuery, drivingLicense };
    }
    if (oldPassword) {
      const client = await Clients.findById(id);
      if (!client || !(await bcrypt.compare(oldPassword, client.password))) {
        throw new Error("Invalid credentials");
      }
      updateQuery.password = await bcrypt.hash(newPassword, 10);
    }
   
    if(image){
      const result = await uploadImageToCloudinary(image, "profile Pics");
      console.log(result.secure_url);
     const fileData = {
        public_id: result.public_id ,
        secure_url: result.secure_url ,
      };
      updateQuery = { ...updateQuery,image:fileData }
    }
    await Clients.findByIdAndUpdate(id, updateQuery);
    res.status(200).json({ msg: "Update Done" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const from = process.env.EMAIL_FROM;
  try {
    if (!email) {
      throw new Error("No Email Provided");
    }
    const user = await Clients.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    let resetToken = JWT.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15min",
    });
    await sendEmail({ email, emailType: "RESETPASSWORD", resetToken });
    res.status(200).json({ msg: "Email Sent" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetToken, newPassword, confirmPassword } = req.body;
  try {
    if (newPassword !== confirmPassword) {
      throw new Error("Passwords Not Matching");
    }
    const decode = await JWT.decode(resetToken, process.env.JWT_ACCESS_SECRET);
    const user = await Clients.findById(decode.id);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await Clients.findByIdAndUpdate(user.id, { password: hashedPassword });
    res.status(200).json({ msg: "Password Reset Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const authClient = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(403).send({ msg: "Please Login Again" });
  }
  const user = await Clients.findById({
    _id: req.session.userId,
  });
  if (!user) {
    res.status(404).json({ msg: "Invalid Credentials" });
  }

  const {
    id,
    name,
    customerId,
    isVerified,
    email,
    firstName,
    lastName,
    phoneNumber,
    gender,
    dateOfBirth,
    companyName,
    address,
    nationalId,
    city,
    postalCode,
    drivingLicense,
    image
  } = user;
  res
    .status(200)
    .json({
      login: true,
      id,
      customerId,
      name,
      email,
      isVerified,
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      companyName,
      address,
      nationalId,
      city,
      postalCode,
      drivingLicense,
      image
    });
};

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await Clients.findOne({ email });

    if (!user) {
     return res.status(404).json({ msg: "User Not Found" });
    }
    if (user.isVerified) {
      return res.status(200).json({ msg: "User Already Verified" });
    }

    const g_otp = await generateOtp();
    const oldOtpData = await OTP.findOne({ userId: user._id });
    if (oldOtpData) {
      const sendNewOtp = await validateOneMinuteExpiry(oldOtpData.timeStamp);
      if (!sendNewOtp) {
        return res.status(400).json({ msg: "Try again after one minute" });
      }
    }
    const currentDate = new Date();
    await OTP.findOneAndUpdate(
      { userId: user._id },
      { otp: g_otp, timeStamp: new Date(currentDate.getTime()) },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await sendEmail({ email, emailType: "VERIFYEMAIL", g_otp });

    res.status(200).json({ msg: "OTP has been sent to your email", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;
    const otpData = await OTP.findOne({
      userId,
      otp,
    });
    if (!otpData) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    const verifyOtp = await validateOtp(otpData.timeStamp);
    if (verifyOtp) {
      return res.status(400).json({ msg: "OTP Expired" });
    }
    await Clients.findByIdAndUpdate(
      { _id: userId },
      { $set: { isVerified: true } }
    );
    res.status(200).json({ msg: "Account Verified Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
