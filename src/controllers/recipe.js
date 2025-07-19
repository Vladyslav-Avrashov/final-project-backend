import createHttpError from 'http-errors';
import { parsedIngredientsField } from '../utils/parsedIngredientsField.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { validatedRecipe } from '../utils/validatedRecipe.js';
import { createNewRecipe, getRecipes } from '../services/recipe.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortRecipesParams.js';
import { recipesSortFields } from '../db/models/Recipe.js';
import { parseRecipeFilters } from '../utils/parseRecipeFilters.js';

const enableCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';

export const getRecipesController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query, recipesSortFields);
  const filters = parseRecipeFilters(req.query);
  filters.owner = userId;
  const data = await getRecipes({ page, perPage, sortBy, sortOrder, filters });
  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data,
  });
};

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
