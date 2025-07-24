import createHttpError from 'http-errors';
import { deleteOwnRecipe, getRecipeById } from '../services/recipe.js';

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
