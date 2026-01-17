import * as chatService from "../services/message.service.js";
import { AppError } from "../utils/AppError.js";
import { sendSuccess } from "../utils/successHandler.js";
import { apiHandler } from "../utils/apiHandler.js"; 

export const saveMessage = apiHandler(async (req, res) => {
  const { chatId, senderId, text, targetUserId } = req.body;

  if (!chatId || !senderId || !text) {
    throw new AppError("Missing required fields", 400);
  }

  const message = await chatService.createMessage({ chatId, senderId, text, targetUserId });
  return sendSuccess(res, message, "Message saved successfully", 201,);
});

export const getMessagesByTask = apiHandler(async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) throw new AppError("Task ID is required", 400);

  const messages = await chatService.getMessagesByChatId(taskId);
  return sendSuccess(res, messages,"Messages for task fetched successfully", 200);
});
