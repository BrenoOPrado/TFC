import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private service = new MatchesService()) {}

  findAll = async (_req: Request, res: Response) => {
    const result = await this.service.findAll();
    const { status, message } = result;

    res.status(status).json(message);
  };
}
