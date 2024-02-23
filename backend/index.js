
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import  MongoDBStore  from "connect-mongodb-session";
import contactFormRouter from "./routes/contactFormRoutes.js";
import invoiceRouter from "./routes/invoiceRoutes.js";
import clientRouter from "./routes/clientRoutes.js";
import SupportRouter from "./routes/SupportRoutes.js";
import uploadRouter from "./controllers/upload-fileController.js";
import supportRouter from "./routes/SupportRoutes.js";
import ProjectOrderRouter from "./routes/ProjectOrderRoutes.js";
import projectsRouter from "./routes/projectsRoutes.js";
import paymentProofRouter from "./routes/paymentProofRoutes.js";



dotenv.config();
const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cors({
  credentials:true,
  methods: ["GET", "POST", "PUT", "DELETE"],
 // origin:['http://localhost:5173']
}
));

app.use(express.json({ limit: '500mb' }));



const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

app.use(session({
  secret: process.env.SESSSION_SECRET,
  resave:false,
  saveUninitialized: false,
  store:store,
  cookie:{
    secure: "auto",
    maxAge:1000 * 60 * 60 * 48,
  }
}));

//Define the root directory for serving static files
const root = path.resolve();
app.use(express.static(path.join(root, 'dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(root, 'dist/index.html'));
});

app.use("/api/clients",clientRouter);
app.use('/api/contact', contactFormRouter);
app.use("/api/invoices",invoiceRouter);
app.use("/api/Support",SupportRouter);
app.use('/api/ProjectOrder', ProjectOrderRouter);
app.use('/api/files',uploadRouter);
app.use("/api/support",supportRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/paymentProofs', paymentProofRouter);

mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,console.log(`Server is running on http://localhost:${process.env.PORT}`))
})
.catch((error)=>{
    console.log(error)
});


