import express from "express";
import { saveMessage, getMessagesByTask } from "../controllers/message.controller.js";
import { getMessageSchema, sendMessageSchema } from "../validators/message.schema.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/add", validate(sendMessageSchema), saveMessage);

router.get("/task/:taskId", validate(getMessageSchema), getMessagesByTask);


export default router;
