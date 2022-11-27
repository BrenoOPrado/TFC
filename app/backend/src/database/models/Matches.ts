import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './Teams';

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
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'teams', key: 'id' },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'teams', key: 'id' },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'matches',
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});
Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

Teams.hasMany(Matches, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});
Teams.hasMany(Matches, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default Matches;
