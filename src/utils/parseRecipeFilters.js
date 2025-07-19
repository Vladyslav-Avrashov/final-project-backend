const parseString = (str) => {
  if (typeof str !== 'string') return;

  return str;
};

export const parseRecipeFilters = ({ type }) => {
  const parsedType = parseString(type);

  return {
    type: parsedType,
  };
};
