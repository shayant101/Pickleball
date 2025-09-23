import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: number;
  email: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Generate JWT access and refresh tokens
 * @param payload - The payload to include in the tokens
 * @returns TokenPair - Object containing access and refresh tokens
 */
export function generateTokens(payload: TokenPayload): TokenPair {
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
  const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

  if (!accessSecret || !refreshSecret) {
    throw new Error('JWT secrets are not configured');
  }

  const accessToken = jwt.sign(payload, accessSecret, {
    expiresIn: accessExpiresIn as string,
  });

  const refreshToken = jwt.sign(payload, refreshSecret, {
    expiresIn: refreshExpiresIn as string,
  });

  return {
    accessToken,
    refreshToken,
  };
}

/**
 * Verify and decode a JWT access token
 * @param token - The JWT token to verify
 * @returns TokenPayload - The decoded token payload
 */
export function verifyAccessToken(token: string): TokenPayload {
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  
  if (!accessSecret) {
    throw new Error('JWT access secret is not configured');
  }

  try {
    const decoded = jwt.verify(token, accessSecret) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
}

/**
 * Verify and decode a JWT refresh token
 * @param token - The JWT refresh token to verify
 * @returns TokenPayload - The decoded token payload
 */
export function verifyRefreshToken(token: string): TokenPayload {
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  
  if (!refreshSecret) {
    throw new Error('JWT refresh secret is not configured');
  }

  try {
    const decoded = jwt.verify(token, refreshSecret) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
}