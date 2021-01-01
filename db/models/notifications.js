"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class notifications extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            notifications.belongsTo(models.users, {
                foreignKey: "usersId"
            });
        }
    }

    notifications.init({
        title: DataTypes.STRING,
        message: DataTypes.TEXT,
        read: DataTypes.BOOLEAN,
        propositionsId: DataTypes.STRING,
        propositionsDay: DataTypes.STRING,
        propositionsWeek: DataTypes.INTEGER,
        propositionImg: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        },
    }, {
        sequelize,
        modelName: "notifications",
    });
    return notifications;
};
