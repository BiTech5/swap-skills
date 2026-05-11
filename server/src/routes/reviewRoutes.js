import { createReviews,getUserReview } from "../controllers/reviewControllers.js";
import express from "express";
import auth from "../middleware/auth.js";

router=express.Router();

router.get("/:userId",auth,getUserReview);
router.post("/",auth,createReviews);

export default router;