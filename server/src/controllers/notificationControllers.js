import Notification from "../models/Notification.js";

export const getNotifications=async (req,res)=>{
    try{
        const notifications=await Notification.find({user:req.user.id}).sort({createdAt:-1});
        res.status(200).json(notifications);
    }catch(err){res.status(500).send(err.message);}
}

export const markAsRead=async(req,res)=>{
    try{
        const notification=await Notification.findById(req.params.id);
        if(!notification){
            return res.status(404).send("Notification not found");
        }
        if (notification.user.toString()!==req.user.id){
            return res.status(403).send("Unautorized");
        }

        notification.isRead=true;
        await notification.save();
        res.json(notification);
    }catch(err){res.status(500).send(err.message);}
}
