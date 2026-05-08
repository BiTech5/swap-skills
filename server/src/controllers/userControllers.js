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
        const updateUser=await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            {new:true}
        ).select("-password");
        if(!updateUser){
            return res.status(404).send("User not found");
        }
        res.json(updateUser);
    }catch(err){
        res.status(500).send(err.message);
    }
}
