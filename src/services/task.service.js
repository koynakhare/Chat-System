import Task from "../models/Task.model.js";
import { AppError } from "../utils/AppError.js";

export const createTaskService = async (data, user) => {
  const task = await Task.create({
    ...data,
    createdBy: user?._id,
  });

  return task;
};

export const getAllTasksService = async () => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  if (!tasks.length) {
    throw new AppError("No tasks found", 404);
  }

  return tasks;
};

export const getTaskByIdService = async (taskId,) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

export const updateTaskService = async (payload, user) => {
  const { taskId } = payload || {}
  console.log(taskId,payload)
  const task = await Task.findByIdAndUpdate(taskId, payload, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

export const deleteTaskService = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};
