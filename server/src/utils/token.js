import jwt from "jsonwebtoken";

// access token
export const generateAccessToken=(user)=>{
    return jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:"7m"}
    );
};


// refresh token
export const generateRefreshToken=(user)=>{
    return jwt.sign(
        {
            id:user.id
        },
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );
};