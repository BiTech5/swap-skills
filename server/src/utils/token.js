import jwt from "jsonwebtoken";

// access token
export const generateAccessToken=(user)=>{
    const accessTokenExpiresIn="1h";
    return jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:accessTokenExpiresIn}
    );
};


// refresh token
export const generateRefreshToken=(user)=>{
    const refreshTokenExpiresIn="7d";
    return jwt.sign(
        {
            id:user.id
        },
        process.env.JWT_SECRET,
        {expiresIn:refreshTokenExpiresIn}
    );
};
