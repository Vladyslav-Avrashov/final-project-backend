import { getRefreshTokenValidUntil } from '../constants/index.js';

export const setupSession = (res, session) => {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: getRefreshTokenValidUntil(),
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: getRefreshTokenValidUntil(),
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
  });
};
