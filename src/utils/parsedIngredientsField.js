import createHttpError from 'http-errors';

export const parsedIngredientsField = ({ ingredients }) => {
  const parsedIngredients = JSON.parse(ingredients);

  if (!Array.isArray(parsedIngredients)) {
    throw createHttpError(400, 'ingredients must be array');
  }

  return parsedIngredients;
};
