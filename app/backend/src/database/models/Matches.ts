import { Model, DataTypes } from 'sequelize';
import db from '.';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoal: number;
  declare awayTeam: number;
  declare awayTeamGoal: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'matches',
});

export default Matches;
