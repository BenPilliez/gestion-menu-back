"use strict";
const {
    Model
} = require("sequelize");
const moment = require("moment");
require("moment/locale/fr");
module.exports = (sequelize, DataTypes) => {
    class propositions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            propositions.belongsTo(models.users, {
                foreignKey: "usersId"
            });
        }
    }

    propositions.init({
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Allez on rempli le formulaire correctement, il me faut un titre"
                },
                notNull: {
                    msg: "Allez on rempli le formulaire correctement, il me faut un titre"
                }
            }
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Allez on rempli le formulaire correctement, il me faut une image"
                },
                notNull: {
                    msg: "Allez on rempli le formulaire correctement, il me faut une image"
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false
        },
        period: {
            type: DataTypes.STRING,
            allowNull: false
        },
        week: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
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
        date: {
            type: DataTypes.VIRTUAL,
            get() {
                return moment().day(this.day).week(this.week);
            }
        }
    }, {
        sequelize,
        modelName: "propositions",
    });
    return propositions;
};
