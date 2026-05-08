import jwt from "jsonwebtoken";

const auth=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader){
            return res.status(401).send("No token");
        }
        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).send(err.message);
        console.error(err.message);
    }
}

export default auth;
