import Message from "../models/Message.model.js";

export const createMessage = async (messageData) => {
  return await Message.create(messageData);
};

export const getAllMessages = async () => {
  return await Message.find()
    .populate("senderId", "name email") 
    .sort({ createdAt: -1 });
};

export const getMessagesByChatId = async (chatId) => {
  return await Message.find({ chatId }).sort({ createdAt: 1 });
};
