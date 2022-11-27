import { Model, DataTypes } from 'sequelize';
import db from '.';
// import Teams from './Teams';

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
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'teams', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'teams', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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

/* Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam',
});
Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam',
});

Teams.hasMany(Matches, {
  foreignKey: 'homeTeam',
});
Teams.hasMany(Matches, {
  foreignKey: 'awayTeam',
}); */

export default Matches;
