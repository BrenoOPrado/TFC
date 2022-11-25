import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  constructor(private service = new TeamsService()) {}

  findAll = async (_req: Request, res: Response) => {
    const result = await this.service.findAll();
    const { status, message } = result;

    res.status(status).json(message);
  };

  findOne = async (req: Request, res: Response) => {
    const result = await this.service.findOne(req.params.id);
    const { status, message } = result;

    res.status(status).json(message);
  };
}
