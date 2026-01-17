import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import taskRoutes from "./task.routes.js";
import chatRoutes from "./chat.routes.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", protect, userRoutes);
router.use("/chat", protect, chatRoutes);
router.use("/task", protect, taskRoutes);

export default router;
