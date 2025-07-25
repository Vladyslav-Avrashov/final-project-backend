import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader)
    throw createHttpError(401, 'Please provide Authorization header');

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token)
    throw createHttpError(401, 'Authorization header should be type of Bearer');

  const session = await SessionCollection.findOne({ accessToken: token });

  if (!session) throw createHttpError(401, 'Session not found');

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  req.user = user;

  next();
};
