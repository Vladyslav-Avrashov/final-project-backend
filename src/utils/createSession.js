import { randomBytes } from 'crypto';
import {
  getAccessTokenValidUntil,
  getRefreshTokenValidUntil,
} from '../constants/index.js';

export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: getAccessTokenValidUntil(),
    refreshTokenValidUntil: getRefreshTokenValidUntil(),
  };
};
