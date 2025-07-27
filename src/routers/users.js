import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { currentUserController } from '../controllers/auth.js';

const usersRouter = Router();

usersRouter.get('/current', authenticate, ctrlWrapper(currentUserController));

usersRouter.post('/favorites/:id', authenticate, async (req, res) => {
  const recipeId = req.params.id;

  if (!req.user.favorites.includes(recipeId)) {
    req.user.favorites.push(recipeId);
    await req.user.save();
  }

  res.json({ message: 'Added to favorites' });
});

usersRouter.delete('/favorites/:id', authenticate, async (req, res) => {
  const recipeId = req.params.id;

  req.user.favorites = req.user.favorites.filter(
    (id) => id.toString() !== recipeId,
  );
  await req.user.save();

  res.json({ message: 'Removed from favorites' });
});

usersRouter.get('/favorites', authenticate, async (req, res) => {
  const user = await req.user.populate('favorites');
  res.json(user.favorites);
});

export default usersRouter;
