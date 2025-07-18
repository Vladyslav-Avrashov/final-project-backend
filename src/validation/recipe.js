import Joi from 'joi';

export const createRecipeSchema = Joi.object({
  title: Joi.string().max(64).required().messages({
    'string.base': 'title must be a string',
    'string.max': 'title must be at most 64 characters',
    'any.required': 'title is required',
  }),

  description: Joi.string().max(200).required().messages({
    'string.base': 'description must be a string',
    'string.max': 'description must be at most 200 characters',
    'any.required': 'description is required',
  }),

  time: Joi.string().required().messages({
    'string.base': 'time must be a string',
    'any.required': 'time is required',
  }),

  calories: Joi.string().optional().messages({
    'string.base': 'calories must be a string',
  }),

  category: Joi.string().required().messages({
    'string.base': 'category must be a string',
    'any.required': 'category is required',
  }),

  ingredients: Joi.string().required().messages({
    'any.required': 'ingredients is required',
  }),

  instructions: Joi.string().max(1200).required().messages({
    'string.base': 'instructions must be a string',
    'string.max': 'instructions must be at most 1200 characters',
    'any.required': 'instructions is required',
  }),
});
