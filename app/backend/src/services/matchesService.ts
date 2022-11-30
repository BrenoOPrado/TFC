import { Request } from 'express';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import Exception from '../middlewares/exception';

export default class MatchesService {
  private model;
  private teamsModel;

  constructor() {
    this.model = Matches;
    this.teamsModel = Teams;
  }

  findAll = async () => {
    const result: Matches[] = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome' },
        { model: Teams, as: 'teamAway' },
      ],
    });

    return { status: 200, message: result };
  };

  findInProgress = async (bool: boolean) => {
    const result: Matches[] = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome' },
        { model: Teams, as: 'teamAway' },
      ],
      where: {
        inProgress: bool,
      },
    });

    return { status: 200, message: result };
  };

  findOne = async (id: number) => {
    const result: Matches | null = await this.model.findOne({
      where: {
        id: Number(id),
      },
    });

    return { status: 200, message: result };
  };

  insert = async (body: Matches) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = body;

    const create = await this.model.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });

    const { message } = await this.findOne(Number(create.dataValues.id));

    return { status: 201, message };
  };

  finish = async (id: number) => {
    if (await this.findOne(Number(id))) {
      await this.model.update({
        inProgress: false,
      }, {
        where: { id: Number(id) },
      });
    } else {
      throw new Exception(404, 'Matche not found');
    }

    return { status: 200, message: 'Finished' };
  };

  goalTeam = async (req: Request) => {
    const { params, body } = req;
    const id = Number(params.id);
    const { homeTeamGoals, awayTeamGoals } = body;

    if (await this.findOne(id)) {
      await this.model.update({
        homeTeamGoals, awayTeamGoals,
      }, {
        where: { id: Number(id) },
      });
    } else {
      throw new Exception(404, 'Matche not found');
    }

    return { status: 200, message: 'Updated' };
  };
}
