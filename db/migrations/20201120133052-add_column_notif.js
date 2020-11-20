'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
        queryInterface.addColumn('notifications', 'propositionsId', {
          type: Sequelize.STRING
        }),
      queryInterface.addColumn('notifications', 'propositionsDay', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('notifications', 'propositionsWeek', {
        type: Sequelize.INTEGER
      }),

    ]
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('notifications', 'propositionsId'),
      queryInterface.removeColumn('notifications', 'propositionsDay'),
      queryInterface.removeColumn('notifications', 'propositionsWeek'),

    ]
  }
};
