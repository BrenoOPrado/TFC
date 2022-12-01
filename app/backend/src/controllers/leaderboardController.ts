import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(private service = new LeaderboardService()) {}

  findAll = async (req: Request, res: Response) => {
    let result;

    if (req.url === '/home') {
      console.log('foi no home');

      result = await this.service.findAllHome();
    } else if (req.url === '/away') {
      console.log('foi no away');

      result = await this.service.findAllAway();
    }

    if (result !== undefined) {
      const { status, message } = result;
      res.status(status).json(message);
    }
  };
}
