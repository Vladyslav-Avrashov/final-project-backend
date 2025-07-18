import { getRefreshTokenValidUntil } from '../constants/index.js';

export const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: getRefreshTokenValidUntil(),
    secure: true,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: getRefreshTokenValidUntil(),
    secure: true,
  });
};
