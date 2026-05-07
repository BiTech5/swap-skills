import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateAccessToken,generateRefreshToken } from "../utils/token";


let refreshTokens=[];
export const register=(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).send("Email already exists");
        }

        const hashedPassword=await bcrypt.hash(password, 10);
        const user=await User.create({
            name, email,
            password:hashedPassword,
            role
        })
        res.status(201).json(user);
    }catch(err){
        res.status(500).send(err.message);
        console.error(err.message);
    }
}


export const login=(req,res)=>{
    try{
        const {email, password}=req.body;
        const user=await User.findOne(email);
        if(!user){
            return res.status(404).send("User not found");
        }
        const isMatch=await bcrypt.comapre(
            password,user.password
        )
        if(!isMatch){
            return res.status(400).send("Invalid password");
        }
        const accessToken=generateAccessToken(user);
        const refreshToken=generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        return res.status(200).json({
            accessToken,
            refreshToken
        })
    }
    catch(err){
        res.status(500).send(err.message);
    }
}