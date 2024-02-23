import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const clientDetails = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    phone:{
        type:Number,
        required:[true,"Please provide a number"]
    },
    email:{
        type:String,
        required:[true,"Please provide a email"]
    }

});

const InvoiceSchema = new mongoose.Schema({
    to:{
        type:clientDetails,
        required: [true, "Please provide recipient information"],
       
    },
    service:{
        type: [serviceSchema],
        required:[true,"Please provide at least one service"]
    },
    status: {
        type: String,
        enum: ['paid','unpaid'],
        default: 'unpaid'
     },
    amount:{
        type:Number,
        required:[true,"Please provide a amount"],
    },
    discount: {
        type:Number
    },
    customerId:{
        type: String,
        required:[true,"Please provide a customerId"]
    },
    orderId: {
        type: String,
        required:[true,"Please provide a OrderId"]
      },
    invoiceType: {
        type: String,
        enum: ['full', 'half'],
        default: 'full'
    },
    dueDate:{
        type:Date,
    },
    secondInvoiceDueDate:{
        type:Date,
    },

},{timestamps:true});

const mainDocumentSchema = new mongoose.Schema({
    paymentStatus: {
        type: String,
        enum: ['paid', 'partially paid', 'unpaid'],
        default: 'unpaid'
    },
    orderId: {
        type: String,
        required: [true, "Please provide a OrderId"]
    },
    customerId:{
        type: String,
        required:[true,"Please provide a customerId"]
    },
    invoices:[InvoiceSchema]
    
});

export const Invoices = mongoose.model("Invoice", InvoiceSchema);
export const MainDocument  = mongoose.model("Invoices", mainDocumentSchema);