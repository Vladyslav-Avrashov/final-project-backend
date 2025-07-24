import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw createHttpError(400, 'Invalid ID format');

  next();
};
