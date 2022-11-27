import { NextFunction, Request, Response } from 'express';
import validateEmail from './validateEmail';

export default (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  if (!body.email || !body.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  validateEmail(body.email);

  next();
};
