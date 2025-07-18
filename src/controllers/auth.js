import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';

export const registerController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'User has been successfully registered',
    data: user,
  });
};

export const loginController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'User has been successfully logged in',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshSessionController = async (req, res) => {
  const session = await refreshSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Session has been refreshed',
    data: {
      accessToken: session.accessToken,
    },
  });
};
export const currentUserController = async (req, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({
    status: 200,
    message: 'Current user retrieved successfully',
    data: { _id, name, email },
  });
};
