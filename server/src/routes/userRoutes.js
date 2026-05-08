import express from "express";
import auth from "../middleware/auth.js";
import { getProfile,updateProfile } from "../controllers/userControllers.js";

const router=express.Router();

router.get("/profile",auth,getProfile);

router.patch("/profile",auth,updateProfile);
