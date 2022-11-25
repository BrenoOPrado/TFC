import { Secret, SignOptions, verify, sign, decode } from 'jsonwebtoken';
import { IToken } from '../interfaces';
import Exeption from './exception';

const TOKEN_SECRET_KEY: Secret = 'jwt_secret';

type Login = {
  email: string,
};

export default class AuthMiddleware {
  generateToken = (data: Login): IToken => {
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

  authenticateToken = async (token: IToken): Promise<void> => {
    if (!token) {
      const status = 401;
      const message = 'Token not found';
      throw new Exeption(status, message);
    }

    try {
      verify(token.token, TOKEN_SECRET_KEY);
      return;
    } catch (error) {
      const status = 401;
      const message = 'Expired or invalid token';
      throw new Exeption(status, message);
    }
  };

  decodeToken = async (token: string) => {
    const decoded = await decode(token);
    console.log(decoded);

    return decoded;
  };
}
