"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn("propositions", "content", {
            type: Sequelize.TEXT,
            allowNull: true
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn("propositions", "content", {
            type: Sequelize.TEXT,
            allowNull: false
        });
    }
};
