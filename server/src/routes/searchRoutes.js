import express from "express";
import { searchUser } from "../controllers/searchControllers";
const router = express.Router();

router.get("/",searchUser);
export default router;
