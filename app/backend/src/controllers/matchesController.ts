import { Request, Response } from 'express';
import AuthToken from '../middlewares/authMiddleware';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  private service;
  private authToken;

  constructor() {
    this.service = new MatchesService();
    this.authToken = new AuthToken();
  }

  findAll = async (req: Request, res: Response) => {
    let result;
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      result = await this.service.findAll();
      const { status, message } = result;
      return res.status(status).json(message);
    }

    if (inProgress === 'true') {
      result = await this.service.findInProgress(true);
    } else {
      result = await this.service.findInProgress(false);
    }

    const { status, message } = result;

    res.status(status).json(message);
  };

  insert = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (authorization) {
      this.authToken.authenticateToken({ token: authorization });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
    const result = await this.service.insert(req.body);
    const { status, message } = result;

    res.status(status).json(message);
  };
}
