import createHttpError from 'http-errors';
import {
  getRecipes,
  deleteOwnRecipe,
  getRecipeById,
} from '../services/recipe.js';

export const getOwnRecipesController = async (req, res) => {
  const userId = req.user._id;

  const {
    page = 1,
    perPage = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    category,
    ingredientName,
    searchQuery,
  } = req.query;

  const result = await getRecipes({
    page: Number(page),
    perPage: Number(perPage),
    sortBy,
    sortOrder,
    filters: {
      userId,
      category,
      ingredientName,
      searchQuery,
    },
  });

  res.json(result);
};

export const deleteOwnRecipeController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const recipe = await getRecipeById(id);
  if (!recipe) throw createHttpError(404, 'Recipe not found');

  if (recipe.owner !== userId.toString())
    throw createHttpError(403, 'This is not your recipe');

  await deleteOwnRecipe(id);

  res.status(204).send();
};
