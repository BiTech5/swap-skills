import User from "../models/User.js";

// for User detail
export const getProfile=async (req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).send(err.message);
    }
}

// for user profile update
export const updateProfile=async (req,res)=>{
    try{
        if ("password" in req.body || "role" in req.body) {
            return res.status(400).send("Password and role cannot be updated here");
        }

        const allowedFields=["name","bio","skillsoffered","skillswanted"];
        const updateData={};
        for(const field of allowedFields){
            if(field in req.body){
                updateData[field]=req.body[field];
            }
        }

        const updateUser=await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            {new:true, runValidators:true}
        ).select("-password");
        if(!updateUser){
            return res.status(404).send("User not found");
        }
        res.status(200).json(updateUser);
    }catch(err){
        res.status(500).send(err.message);
    }
}
