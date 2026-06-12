import {getSkillsPosts} from "../controllers/skillsPostsControllers.js";
import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getSkillsPosts);

export default router;
