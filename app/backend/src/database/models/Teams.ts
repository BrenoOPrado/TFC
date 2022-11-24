import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'teams',
});

export default Teams;
