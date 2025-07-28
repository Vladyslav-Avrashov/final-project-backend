import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { currentUserController } from '../controllers/auth.js';
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from '../controllers/favorites.js';
import { getOwnRecipesController } from '../controllers/ownRecipes.js';

const usersRouter = Router();

usersRouter.get('/current', authenticate, ctrlWrapper(currentUserController));

usersRouter.post('/favorites/:id', authenticate, ctrlWrapper(addToFavorites));

usersRouter.delete(
  '/favorites/:id',
  authenticate,
  ctrlWrapper(removeFromFavorites),
);

usersRouter.get('/favorites', authenticate, ctrlWrapper(getFavorites));

usersRouter.get('/own', authenticate, ctrlWrapper(getOwnRecipesController));

export default usersRouter;
