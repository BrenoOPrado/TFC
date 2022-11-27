import Matches from '../database/models/Matches';

export default class MatchesService {
  private model;

  constructor() {
    this.model = Matches;
  }

  findAll = async () => {
    const result: Matches[] = await this.model.findAll();

    return { status: 200, message: result };
  };
}
