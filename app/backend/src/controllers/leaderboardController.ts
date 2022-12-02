import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(private service = new LeaderboardService()) {}

  findAll = async (req: Request, res: Response) => {
    let result;

    if (req.url === '/home') {
      result = await this.service.findAllHome();
    } else if (req.url === '/away') {
      result = await this.service.findAllAway();
    } else {
      result = await this.service.findAll();
    }
    const { status, message } = result;

    res.status(status).json(message);
  };
}
