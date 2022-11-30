import { Secret, SignOptions, verify, sign, decode, JwtPayload } from 'jsonwebtoken';
import Users from '../database/models/Users';
import { IToken } from '../interfaces';

const TOKEN_SECRET_KEY: Secret = 'jwt_secret';

export default class AuthMiddleware {
  generateToken = (data: Users): IToken => {
    const payload = {
      ...data,
    };

    const jwtConfig: SignOptions = {
      expiresIn: '50m',
      algorithm: 'HS256',
    };

    const token: string = sign(payload, TOKEN_SECRET_KEY, jwtConfig);
    return { token };
  };

  authenticateToken = (token: string) => {
    if (!token) {
      const status = 401;
      const message = 'Token not found';
      return { status, message };
    }

    try {
      verify(token, TOKEN_SECRET_KEY);
      return null;
    } catch (error) {
      const status = 401;
      const message = 'Token must be a valid token';
      return { status, message };
    }
  };

  decodeToken = (token: string): JwtPayload => {
    const decoded = decode(token);

    return decoded as JwtPayload;
  };
}
