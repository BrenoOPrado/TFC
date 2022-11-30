import { NextFunction, Request, Response } from 'express';
import Teams from '../database/models/Teams';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  const home: Teams | null = await Teams.findOne({ where: { id: Number(homeTeam) } });
  const away: Teams | null = await Teams.findOne({ where: { id: Number(awayTeam) } });

  if (home === null || away === null) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};
