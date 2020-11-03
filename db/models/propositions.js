'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class propositions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            propositions.belongsTo(model.users, {
                foreignKey: 'usersId'
            })
        }
    }

    propositions.init({
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false
        },
        month: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        period: {
            type: DataTypes.STRING,
            allowNull: false
        },
        week: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    }, {
        sequelize,
        modelName: 'propositions',
    });
    return propositions;
};
