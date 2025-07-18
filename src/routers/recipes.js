import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/upload.js';
import { createRecipeSchema } from '../validation/recipe.js';
import { createNewRecipeController } from '../controllers/recipe.js';

const recipesRouter = Router();

recipesRouter.post(
  '/',
  upload.single('thumb'),
  validateBody(createRecipeSchema),
  ctrlWrapper(createNewRecipeController),
);

export default recipesRouter;
