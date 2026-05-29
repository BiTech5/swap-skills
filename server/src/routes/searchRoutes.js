import express from "express";
import { searchUser } from "../controllers/searchControllers.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/",auth,searchUser);
export default router;
