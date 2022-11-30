import Matches from '../database/models/Matches';

export default class LeaderboardService {
  private model;

  constructor() {
    this.model = Matches;
  }

  findAll = async () => {};
}
