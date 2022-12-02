import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import LeaderboardHelpers from '../middlewares/leaderboardHelpers';
import { leaderboard } from '../interfaces';

export default class LeaderboardService {
  private modelMatches;
  private modelTeams;
  private helper;
  private result: leaderboard[];

  constructor() {
    this.modelMatches = Matches;
    this.modelTeams = Teams;
    this.helper = new LeaderboardHelpers();
    this.result = [];
  }

  findAllHome = async () => {
    const allMatches: Matches[] = await this.modelMatches.findAll({ where: { inProgress: false } });
    const allTeams: Teams[] = await this.modelTeams.findAll();

    allTeams.forEach((team) => {
      const matchesByHomeTeam: Matches[] = allMatches
        .filter((matche: Matches) => Number(matche.homeTeam) === team.id);

      if (matchesByHomeTeam.length > 0) {
        const totalByGame: leaderboard = this.helper
          .totalPoints(matchesByHomeTeam, 'home', team.id);

        const objResult: leaderboard = {
          name: team.teamName,
          ...totalByGame,
        };

        this.result.push(objResult);
      }
    });

    let orderResult = this.helper.sortResult(this.result);
    const result = orderResult; orderResult = []; this.result = [];

    return { status: 200, message: result };
  };

  findAllAway = async () => {
    const allMatches: Matches[] = await this.modelMatches.findAll({ where: { inProgress: false } });
    const allTeams: Teams[] = await this.modelTeams.findAll();

    allTeams.forEach((team) => {
      const matchesByAwayTeam: Matches[] = allMatches
        .filter((matche: Matches) => Number(matche.awayTeam) === team.id);

      if (matchesByAwayTeam.length > 0) {
        const totalByGame: leaderboard = this.helper
          .totalPoints(matchesByAwayTeam, 'away', team.id);

        const objResult: leaderboard = {
          name: team.teamName,
          ...totalByGame,
        };

        this.result.push(objResult);
      }
    });

    let orderResult = this.helper.sortResult(this.result);
    const result = orderResult; orderResult = []; this.result = [];

    return { status: 200, message: result };
  };

  findAll = async () => {
    const allMatches: Matches[] = await this.modelMatches.findAll({ where: { inProgress: false } });
    const allTeams: Teams[] = await this.modelTeams.findAll();

    allTeams.forEach((team) => {
      const matchesByTeam: Matches[] = allMatches
        .filter((matche: Matches) => Number(matche.homeTeam) === team.id
        || Number(matche.awayTeam) === team.id);

      if (matchesByTeam.length > 0) {
        const totalByGame: leaderboard = this.helper.totalPoints(matchesByTeam, '', team.id);

        const objResult: leaderboard = {
          name: team.teamName,
          ...totalByGame,
        };

        this.result.push(objResult);
      }
    });

    let orderResult = this.helper.sortResult(this.result);
    const result = orderResult; orderResult = []; this.result = [];

    return { status: 200, message: result };
  };
}
