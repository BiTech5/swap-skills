import jwt from "jsonwebtoken";

const auth=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader){
            return res.status(401).send("No token");
        }
        const [scheme, token]=authHeader.split(" ");
        if(scheme!=="Bearer" || !token){
            return res.status(401).send("Invalid authorization format");
        }

        const clockTolerance=Number(process.env.JWT_CLOCK_TOLERANCE_SECONDS || 5);
        const decoded=jwt.verify(token, process.env.JWT_SECRET, { clockTolerance });
        req.user=decoded;
        next();
    }catch(err){
        if(err.name==="TokenExpiredError"){
            return res.status(401).send("Access token expired");
        }
        res.status(401).send("Invalid token");
        console.error(err.message);
    }
}

export default auth;
