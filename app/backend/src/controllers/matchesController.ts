import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  private service;

  constructor() {
    this.service = new MatchesService();
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
    const result = await this.service.insert(req.body);
    const { status, message } = result;

    res.status(status).json(message);
  };

  finish = async (req: Request, res: Response) => {
    const result = await this.service.finish(Number(req.params.id));
    const { status, message } = result;

    res.status(status).json(message);
  };

  goalTeam = async (req: Request, res: Response) => {
    const result = await this.service.goalTeam(req);
    const { status, message } = result;

    res.status(status).json(message);
  };
}
