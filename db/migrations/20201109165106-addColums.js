'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('propositions', 'imageUrl', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.addColumn('propositions', 'title', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('propositions', 'imageUrl'),
      queryInterface.removeColumn('propositions', 'title')
    ];
  }
};
