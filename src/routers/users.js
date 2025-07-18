import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { currentUserController } from '../controllers/auth.js';


const usersRouter = Router();

usersRouter.get('/current', authenticate, ctrlWrapper(currentUserController));

export default usersRouter;
