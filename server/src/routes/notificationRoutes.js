import { getNotifications,markAsRead } from "../controllers/notificationControllers.js";
import express from "express";
import auth from "../middleware/auth.js";
import router from "./reviewRoutes.js";
router=express.Router();

router.get("/",auth,getNotifications);
router.patch("/:id/read",auth,markAsRead);

export default router;