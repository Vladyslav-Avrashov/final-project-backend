import { Router } from 'express';
import { getCategories } from '../controllers/getCategories.js';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);

export default categoriesRouter;
