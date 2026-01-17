import Joi from "joi";

export const sendMessageSchema = Joi.object({
  chatId: Joi.string()
    .required()
    .messages({
      "any.required": "chatId is required",
      "string.empty": "chatId cannot be empty",
    }),
  senderId: Joi.string()
    .required()
    .messages({
      "any.required": "senderId is required",
      "string.empty": "senderId cannot be empty",
    }),
  text: Joi.string()
    .required()
    .messages({
      "any.required": "Text is required",
      "string.empty": "Text cannot be empty",
    }),
  targetUserId: Joi.string()
    .optional()
    .allow(null, "")
    .messages({
      "string.base": "targetUserId must be a string",
    }),
});

export const getMessageSchema = Joi.object({
  chatId: Joi.string()
    .required()
    .messages({
      "any.required": "chatId is required",
      "string.empty": "chatId cannot be empty",
    }),
});
