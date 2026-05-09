import express from "express";
import auth from "../middleware/auth.js";
import { createRequest,getMyRequests, updateRequestStatus } from "../controllers/requestsControllers.js";

const router=express.Router();

router.post("/",auth,createRequest);
router.get("/",auth,getMyRequests);

router.patch("/:id",auth,updateRequestStatus);

export default router;