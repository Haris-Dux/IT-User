import mongoose from "mongoose";

export const  setMongooseid =()=> {
    return mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, returnValue) => {
        delete returnValue._id;
        delete returnValue.__v;
      },
    });
  }