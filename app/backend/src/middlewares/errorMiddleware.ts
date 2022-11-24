import { NextFunction, Request, Response } from 'express';
import Exception from './exception';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as Exception;

  res.status(status || 500).json({ message });
};

export default errorMiddleware;
