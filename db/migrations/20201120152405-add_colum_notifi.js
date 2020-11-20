'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.addColumn('notifications', "propositionImg", {
       type: Sequelize.STRING
    });

  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.removeColumn('notifications', 'propositionImg');

  }
};
