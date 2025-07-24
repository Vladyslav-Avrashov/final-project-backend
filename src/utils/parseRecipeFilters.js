const parseString = (str) => {
  if (typeof str !== 'string') return;
  return str;
};

export const parseRecipeFilters = ({ categories, ingredients, search }) => {

  const parsedCategory = parseString(categories);
  const parsedIngredient = parseString(ingredients);
  const parsedSearch = parseString(search);

  return {
    ...(parsedCategory && { category: parsedCategory }),
    ...(parsedIngredient && { ingredientName: parsedIngredient }),
    ...(parsedSearch && { searchQuery: parsedSearch }), 
  };
};
