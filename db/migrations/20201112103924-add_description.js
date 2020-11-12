'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('propositions', 'description', {
        type: Sequelize.TEXT,
        allowNull: true
      }),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('propositions', 'description')
    ];
  }
};
