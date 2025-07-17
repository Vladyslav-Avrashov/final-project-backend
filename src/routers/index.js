import { Router } from 'express';
import categoriesRouter from './categories.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import ingredientsRouter from './ingredients.js';
import recipesRouter from './recipes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/ingredients', ingredientsRouter);
router.use('/recipes', recipesRouter);

export default router;
