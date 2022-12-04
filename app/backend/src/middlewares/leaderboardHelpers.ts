import { leaderboard } from '../interfaces';
import Matches from '../database/models/Matches';

export default class LeaderboardHelpers {
  gameResultsAway = (matches: Matches[]) => {
    let goalsFavor = 0; let goalsOwn = 0;
    let totalVictories = 0; let totalDraws = 0; let totalLosses = 0;

    matches.forEach((match) => {
      goalsFavor += match.awayTeamGoals; goalsOwn += match.homeTeamGoals;

      if (match.awayTeamGoals === match.homeTeamGoals) {
        totalDraws += 1;
      } else if (match.awayTeamGoals > match.homeTeamGoals) {
        totalVictories += 1;
      } else {
        totalLosses += 1;
      }
    });

    return { goalsFavor, goalsOwn, totalVictories, totalDraws, totalLosses };
  };

  gameResultsHome = (matches: Matches[]) => {
    let goalsFavor = 0; let goalsOwn = 0;
    let totalVictories = 0; let totalDraws = 0; let totalLosses = 0;

    matches.forEach((match) => {
      goalsFavor += match.homeTeamGoals; goalsOwn += match.awayTeamGoals;

      if (match.homeTeamGoals === match.awayTeamGoals) {
        totalDraws += 1;
      } else if (match.homeTeamGoals > match.awayTeamGoals) {
        totalVictories += 1;
      } else {
        totalLosses += 1;
      }
    });

    return { goalsFavor, goalsOwn, totalVictories, totalDraws, totalLosses };
  };

  gameResultsAll = (matches: Matches[], teamId: number) => {
    const matcheHomeTeam = matches.filter((matche) => matche.homeTeam === teamId);
    const matcheAwayTeam = matches.filter((matche) => matche.awayTeam === teamId);

    const homeResults = this.gameResultsHome(matcheHomeTeam);
    const awayResults = this.gameResultsAway(matcheAwayTeam);

    const result = {
      goalsFavor: homeResults.goalsFavor + awayResults.goalsFavor,
      goalsOwn: homeResults.goalsOwn + awayResults.goalsOwn,
      totalVictories: homeResults.totalVictories + awayResults.totalVictories,
      totalDraws: homeResults.totalDraws + awayResults.totalDraws,
      totalLosses: homeResults.totalLosses + awayResults.totalLosses,
    };

    return result;
  };

  gameResults = (matches: Matches[], url: string, teamId: number) => {
    let result;
    if (url === 'home') {
      result = this.gameResultsHome(matches);
    } else if (url === 'away') {
      result = this.gameResultsAway(matches);
    } else {
      result = this.gameResultsAll(matches, teamId);
    }
    return result;
  };

  pointsCalc = (victories: number, draws: number): number => {
    let result = 0;

    if (victories > 0) {
      result += (victories * 3);
    }

    if (draws > 0) {
      result += draws;
    }

    return result;
  };

  totalPoints = (matches: Matches[], url: string, teamId: number): leaderboard => {
    const totalGames = matches.length;
    const games = this.gameResults(matches, url, teamId);
    const { goalsFavor, goalsOwn, totalVictories, totalDraws } = games;

    const totalPoints: number = this.pointsCalc(totalVictories, totalDraws);

    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return { totalPoints,
      ...games,
      totalGames,
      goalsBalance,
      efficiency,
    };
  };

  goalsOwn = (a: leaderboard, b: leaderboard) => {
    if (b.goalsOwn < a.goalsOwn) {
      return -1;
    }
    if (b.goalsOwn > a.goalsOwn) {
      return 1;
    }
    return 0;
  };

  goalsFavor = (a: leaderboard, b: leaderboard) => {
    if (b.goalsFavor < a.goalsFavor) {
      return -1;
    }
    if (b.goalsFavor > a.goalsFavor) {
      return 1;
    }
    return this.goalsOwn(a, b);
  };

  goalsBalance = (a: leaderboard, b: leaderboard) => {
    if (b.goalsBalance < a.goalsBalance) {
      return -1;
    }
    if (b.goalsBalance > a.goalsBalance) {
      return 1;
    }
    return this.goalsFavor(a, b);
  };

  totalVictories = (a: leaderboard, b: leaderboard) => {
    if (b.totalVictories < a.totalVictories) {
      return -1;
    }
    if (b.totalVictories > a.totalVictories) {
      return 1;
    }
    return this.goalsBalance(a, b);
  };

  sortResult = (arr: leaderboard[]) => arr.sort((a, b) => {
    if (b.totalPoints < a.totalPoints) {
      return -1;
    }
    if (b.totalPoints > a.totalPoints) {
      return 1;
    }
    return this.totalVictories(a, b);
  });
}
