import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateAccessToken,generateRefreshToken } from "../utils/token.js";


let refreshTokens=[];
export const register=async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        if(!name || !email || !password){
            return res.status(400).send("name, email and password are required");
        }
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


export const login=async (req,res)=>{
    try{
        const {email, password}=req.body;
        if(!email || !password){
            return res.status(400).send("email and password are required");
        }
        const user=await User.findOne({email}).select("+password");
        if(!user){
            return res.status(404).send("User not found");
        }
        if(!user.password){
            return res.status(500).send("User password is not available");
        }
        const isMatch=await bcrypt.compare(
            password,user.password
        );
        if(!isMatch){
            return res.status(400).send("Invalid password");
        }
        const accessToken=generateAccessToken(user);
        const refreshToken=generateRefreshToken(user);
        refreshToken
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
