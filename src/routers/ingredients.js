import { Router } from 'express';
import { getIngredients } from '../controllers/getIngredients.js';

const ingredientsRouter = Router();

ingredientsRouter.get('/', getIngredients);

export default ingredientsRouter;
