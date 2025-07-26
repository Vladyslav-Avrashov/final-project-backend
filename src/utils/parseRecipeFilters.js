const parseString = (str) => {
  if (typeof str !== 'string') return;
  return str.trim();
};

export const parseRecipeFilters = ({
  type,
  title,
  ingredient,
  categories,
  ingredients,
  search,
  userId,
}) => {
  const parsedType = parseString(type);
  const parsedTitle = parseString(title);
  const parsedIngredient = parseString(ingredient || ingredients);
  const parsedCategory = parseString(categories);
  const parsedSearch = parseString(search);
  const parsedUserId = parseString(userId);

  return {
    ...(parsedType && { type: parsedType }),
    ...(parsedTitle && { title: parsedTitle }),
    ...(parsedIngredient && { ingredientName: parsedIngredient }),
    ...(parsedCategory && { category: parsedCategory }),
    ...(parsedSearch && { searchQuery: parsedSearch }),
    ...(parsedUserId && { userId: parsedUserId }),
  };
};
