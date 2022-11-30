import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(private service = new LeaderboardService()) {}

  findAll = async (_req: Request, res: Response) => {
    const result = await this.service.findAll();
    const { status, message } = result;
    res.status(status).json(message);
  };
}
