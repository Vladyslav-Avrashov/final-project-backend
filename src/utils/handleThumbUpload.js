import createHttpError from 'http-errors';
import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadsDir } from './saveFileToUploadsDir.js';

const enableCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';

export const handleThumbUpload = async (file) => {
  if (!file) throw createHttpError(400, 'thumb is required');

  if (enableCloudinary) {
    return await saveFileToCloudinary(file);
  }
  return saveFileToUploadsDir(file);
};
