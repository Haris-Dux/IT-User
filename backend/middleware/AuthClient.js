import { Clients } from "../models/clientModel.js";


export const verifyClient = async (req, res, next) =>{
  if(!req.session.userId){
      return res.status(401).json({msg: "Please Login Again"});
  }
  const user = await Clients.findOne({_id:req.session.userId });
  if(!user) return res.status(404).json({msg: "Clients Not Found"});
  req.userId = user.id;
  req.superAdmin = user.superAdmin; 
  next();
};

