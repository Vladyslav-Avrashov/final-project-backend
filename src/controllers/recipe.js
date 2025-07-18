import createHttpError from 'http-errors';
import { parsedIngredientsField } from '../utils/parsedIngredientsField.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { validatedRecipe } from '../utils/validatedRecipe.js';
import { createNewRecipe } from '../services/recipe.js';
import { getEnvVar } from '../utils/getEnvVar.js';

const enableCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';

export const createNewRecipeController = async (req, res) => {
  // const { _id: owner } = req.user;
  const owner = '684c3223cffa4cde3dac94f7';

  const validatedData = validatedRecipe(req.body);
  const parsedIngredients = parsedIngredientsField(req.body);

  let thumb = null;

  if (req.file) {
    if (enableCloudinary) {
      thumb = await saveFileToCloudinary(req.file);
    } else {
      thumb = await saveFileToUploadDir(req.file);
    }
  } else {
    throw createHttpError(400, 'thumb is required');
  }

  const data = await createNewRecipe({
    ...req.body,
    ...validatedData,
    ingredients: parsedIngredients,
    thumb,
    owner,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created new recipe!',
    data,
  });
};
