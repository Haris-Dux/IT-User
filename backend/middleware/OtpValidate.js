

const validateOneMinuteExpiry = async (timeStamp) => {
   try {
    const currentTime = new Date();
    var difference = (timeStamp - currentTime.getTime())/1000;
    difference /= 60;
    if(Math.abs(difference) > 1){
        return true;
    }
    return false;
   } catch (error) {
    res.status(401).json({msg:error.message})
   }
};

const validateOtp = async (timeStamp) => {
    try {
     const currentTime = new Date();
     var difference = (timeStamp - currentTime.getTime())/1000;
     difference /= 60;
     if(Math.abs(difference) > 15){
         return true;
     }
     return false;
    } catch (error) {
     res.status(401).json({msg:error.message})
    }
 }

export {validateOneMinuteExpiry,validateOtp}