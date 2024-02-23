
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:[true,"Please Provide User Id"]
    },
    otp:{
        type:Number,
        required:[true,"Please Provide OTP"]
    },
    timeStamp:{
        type:Date,
        default: Date.now(),
        required:[true,"Please Provide Date"],
        get:(timeStamp)=>timeStamp.getTime(),
        set:(timeStamp)=>new Date(timeStamp)
    }
});

export const OTP = mongoose.model("Otp",schema)