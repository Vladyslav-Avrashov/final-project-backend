export const addToFavorites = async (req, res) => {
  const recipeId = req.params.id;

  if (!req.user.favorites.includes(recipeId)) {
    req.user.favorites.push(recipeId);
    await req.user.save();
  }

  res.json({ message: 'Added to favorites' });
};

export const removeFromFavorites = async (req, res) => {
  const recipeId = req.params.id;

  req.user.favorites = req.user.favorites.filter(
    (id) => id.toString() !== recipeId,
  );
  await req.user.save();

  res.json({ message: 'Removed from favorites' });
};

export const getFavorites = async (req, res) => {
  const user = await req.user.populate('favorites');
  res.json(user.favorites);
};
