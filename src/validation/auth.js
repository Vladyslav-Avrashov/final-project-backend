import Joi from 'joi';
import { emailRegExp } from '../constants/index.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().max(16).required(),
  email: Joi.string().pattern(emailRegExp).max(128).required(),
  password: Joi.string().min(8).max(128).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().required(),
});
