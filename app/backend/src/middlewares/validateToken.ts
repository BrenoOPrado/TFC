import { NextFunction, Request, Response } from 'express';
import AuthMiddleware from './authMiddleware';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const AuthToken = new AuthMiddleware();

  if (authorization !== undefined) {
    const auth = AuthToken.authenticateToken(authorization);
    if (auth !== null) {
      const { status, message } = auth;
      return res.status(status).json({ message });
    }
  }

  next();
};
