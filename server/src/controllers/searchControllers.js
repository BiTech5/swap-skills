import User from "../models/User.js";

export const searchUser=async (req,res)=>{
    try{
        const {skill}=req.query;
        if(!skill){
            return res.status(400).send("Skill query required");
        }
        const users=await User.find({
            skillsoffered:{
                $regex:skill,
                $options:"i"
            }
        }).select(-"password");
        res.status(200).json(users);
    }catch(err){
        res.status(500).send(err.message);
    }
}