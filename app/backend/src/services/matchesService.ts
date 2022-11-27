import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import Exception from '../middlewares/exception';

export default class MatchesService {
  private model;

  constructor() {
    this.model = Matches;
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
        id,
      },
    });

    return { status: 201, message: result };
  };

  insert = async (body: Matches) => {
    const { id, homeTeam, homeTeamGoal, awayTeam, awayTeamGoal } = body;

    if (id && homeTeam && homeTeamGoal && awayTeam && awayTeamGoal) {
      await this.model.create({ homeTeam, homeTeamGoal, awayTeam, awayTeamGoal, inProgress: true });
    } else {
      throw new Exception(400, 'Invalid body');
    }

    const result = await this.findOne(Number(id));

    return result;
  };
}
