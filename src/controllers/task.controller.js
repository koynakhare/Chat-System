import {
  createTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
} from "../services/task.service.js";
import { apiHandler } from "../utils/apiHandler.js";
import { sendSuccess } from "../utils/successHandler.js";


export const createTask = apiHandler(async (req, res) => {
  const task = await createTaskService(req.body,req.user);
  sendSuccess(res, task, "Task created", 201);
});

export const getAllTasks = apiHandler(async (req, res) => {
  const tasks = await getAllTasksService();
  sendSuccess(res, tasks, "Tasks fetched");
});

export const getSingleTask = apiHandler(async (req, res) => {
  const task = await getTaskByIdService(req.params.id);
  sendSuccess(res, task, "Task fetched");
});

export const updateTask = apiHandler(async (req, res) => {
  console.log(req.body,'req.body')
  const task = await updateTaskService(req.body,req.user);
  sendSuccess(res, task, "Task updated");
});

export const deleteTask = apiHandler(async (req, res) => {
  console.log(req.params,'req.param')

  await deleteTaskService(req.params.taskId);
  sendSuccess(res, null, "Task deleted");
});
