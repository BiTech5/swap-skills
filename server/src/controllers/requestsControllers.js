import Requests from "../models/Requests.js";

export const createRequest=async(req,res)=>{
    try{
        const requests=await Requests.create({
            sender:req.user.id,
            receiver:req.body.receiver,
            skill:req.body.skill,
            message:req.body.message
        });
        res.status(201).json(requests);

    }catch(err){
        res.status(500).send(err.message);
    }
};

export const getMyRequests=async(req,res)=>{
    try{
        const requests=await Requests.find({
            receiver:req.user.id
        }).populate("sender","name email");
        res.json(requests);
    }catch(err){
        res.status(500).send(err.message);
    }
};

export const updateRequestStatus=async(req,res)=>{
    try{
        const request=await Requests.findById(
            req.params.id
        );
        if(!request){
            return res.status(404).send("Requests not found");
        }
        if(request.receiver.toString()!==req.user.id){
            return res.status(403).send("Unauthorized");
        }
        request.status=req.body.status;
        await request.save();
        res.json(request);
    }catch(err){
        res.status(500).send(err.message);}
}