'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  }
};
