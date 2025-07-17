import createHttpError from 'http-errors';
import { hashPassword } from '../utils/hashPassword.js';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/User.js';
import { createSession } from '../utils/createSession.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');
  const encryptedPassword = await hashPassword(payload.password);

  return UsersCollection.create({ ...payload, password: encryptedPassword });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({
    email: payload.email,
  });
  if (!user) throw createHttpError(401, 'User not found');
  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordCorrect) throw createHttpError(401, 'Incorrect password');
  await SessionCollection.deleteMany({ userId: user._id });

  const session = createSession();

  return SessionCollection.create({ userId: user._id, ...session });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) throw createHttpError(401, 'Session not found');

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired)
    throw createHttpError(401, 'Session token expired');

  const newSession = createSession();

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
