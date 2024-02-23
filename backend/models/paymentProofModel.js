
import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
    accountName:{
        type:String,
        required:[true,"Please Provide Account Name"]
    },
    branchAddress:{
        type:String,
        required:[true,"Please Provide Branch Address"]
    },
    accountNumber:{
        type:String,
        required:[true,"Please Provide Account Number"]    },
    IBAN:{
        type:String,
        required:[true,"Please Provide  IBAN"]    }
})

const schema = new Schema({
    accountUsed:accountSchema,
    image:{
        public_id: { 
            type: String ,
            required:[true,"Please Provide public_id"] 
        },
        secure_url: {
            type: String,
            required:[true,"Please Provide secure_url"]
         },
      },
    mainDocumentId:{
        type:mongoose.Types.ObjectId,
        required:[true,"Please Provide id"]
    },
    invoiceId:{
        type:mongoose.Types.ObjectId,
        required:[true,"Please Provide id"]
    },
    status:{
        type:String,
        enum:['Verified','Pending','Rejected'],
        default:'Pending'
    },
    clientData:{
        name:{type:String},
        customerId:{type:String},
        orderId:{type:String}
    },
    mainDocumentData:{
        type:Object 
    }
},{timestamps:true});

export const PaymentProof = mongoose.model("PaymentProof",schema)