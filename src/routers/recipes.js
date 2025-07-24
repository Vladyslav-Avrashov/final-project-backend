import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/upload.js';
import { createRecipeSchema } from '../validation/recipe.js';
import { getRecipeByIdController } from '../controllers/recipe.js';
import {
  createNewRecipeController,
  getRecipesController,
} from '../controllers/recipe.js';
import { authenticate } from '../middlewares/authenticate.js';
import { deleteOwnRecipeController } from '../controllers/deleteOwnRecipe.js';
import { validateId } from '../middlewares/validateID.js';

const recipesRouter = Router();

recipesRouter.get('/', ctrlWrapper(getRecipesController));

recipesRouter.post(
  '/',
  authenticate,
  upload.single('thumb'),
  validateBody(createRecipeSchema),
  ctrlWrapper(createNewRecipeController),
);
recipesRouter.get('/:id', ctrlWrapper(getRecipeByIdController));

recipesRouter.delete(
  '/:id',
  authenticate,
  validateId,
  ctrlWrapper(deleteOwnRecipeController),
);

export default recipesRouter;
