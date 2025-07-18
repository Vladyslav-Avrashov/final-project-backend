import createHttpError from 'http-errors';

export const validateRefreshCookies = (req, res, next) => {
  if (!req.cookies.sessionId || !req.cookies.refreshToken)
    throw createHttpError(401, 'Missing sessionId or refreshToken');
  next();
};
