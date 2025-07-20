import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/upload.js';
import { createRecipeSchema } from '../validation/recipe.js';
import {
  createNewRecipeController,
  getRecipesController,
} from '../controllers/recipe.js';
import { authenticate } from '../middlewares/authenticate.js';

const recipesRouter = Router();

recipesRouter.get('/', authenticate, ctrlWrapper(getRecipesController));

recipesRouter.post(
  '/',
  authenticate,
  upload.single('thumb'),
  validateBody(createRecipeSchema),
  ctrlWrapper(createNewRecipeController),
);

export default recipesRouter;
