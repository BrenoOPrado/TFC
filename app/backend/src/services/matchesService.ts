import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

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
}
