import {getSkillsPosts} from "../controllers/skillsPostsControllers.js";
import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/skills-posts", auth, getSkillsPosts);

export default router;
