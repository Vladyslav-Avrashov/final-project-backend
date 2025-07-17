import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginController,
  logoutController,
  refreshSessionController,
  registerController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateRefreshCookies } from '../middlewares/validateRefreshCookies.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginController),
);

authRouter.post('/logout', authenticate, ctrlWrapper(logoutController));

authRouter.post(
  '/refresh',
  validateRefreshCookies,
  ctrlWrapper(refreshSessionController),
);

export default authRouter;
