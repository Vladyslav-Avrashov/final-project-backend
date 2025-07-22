const parseString = (str) => {
  if (typeof str !== 'string') return;

  return str;
};

export const parseRecipeFilters = ({ type, title, ingredient }) => {
  const parsedType = parseString(type);
  const parsedIngredient = parseString(ingredient);
  const parsedTitle = parseString(title);

  return {
    type: parsedType,
    ...(parsedIngredient && { ingredient: parsedIngredient }),
    ...(parsedTitle && { title: parsedTitle }),
  };
};
