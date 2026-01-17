import Joi from "joi";

export const createTaskSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(), 
  description: Joi.string().trim().allow("").optional(),
  status: Joi.string().valid("todo", "in-progress", "done").optional(),
  priority: Joi.string().valid("low", "medium", "high").optional(), 
});

export const updateTaskSchema = Joi.object({
  taskId: Joi.string()
    .length(24)
    .hex()
    .required(), 
  name: Joi.string().trim().min(3).max(100).optional(),
  description: Joi.string().trim().allow("").optional(),
  status: Joi.string().valid("todo", "in-progress", "done").optional(),
  priority: Joi.string().valid("low", "medium", "high").optional(),
  assignedTo: Joi.string().length(24).hex().allow(null).optional(),
  dueDate: Joi.date().allow(null).optional(),
  createdBy: Joi.string().length(24).hex().optional(), 
}).min(2); 

export const deleteTaskSchema = Joi.object({
  taskId: Joi.string()
    .length(24) 
    .hex()
    .required(),
});