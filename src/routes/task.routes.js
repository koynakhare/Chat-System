import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/task.controller.js";
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from "../validators/task.schema.js";

const router = express.Router();
router.get("/", getAllTasks);
router.post("/add",validate(createTaskSchema), createTask);
router.post("/edit",validate(updateTaskSchema), updateTask);
router.delete(
  "/delete/:taskId",
  validate(deleteTaskSchema, "params"),
  deleteTask
);
export default router;
