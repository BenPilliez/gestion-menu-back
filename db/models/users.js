"use strict";
const {Model} = require("sequelize");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            users.hasMany(models.propositions, {
                foreignKey: "usersId"
            });

            users.hasMany(models.notifications, {
                foreignKey: "usersId"
            });
        }
    }

    users.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Quelqu'un a piqué ton pseudo"
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Si tu as oublié tes identifiant fait mot de passe oublié"
            },
            validate: {
                notEmpty: {
                    msg: "Allez on rempli le formulaire correctement, il me faut un email"
                },
                notNull: {
                    msg: "Allez on rempli le formulaire correctement, il me faut un email"
                },
                isEmail: {
                    msg: "C'est une adresse mail ça ?"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Et le mot de passe ?"
                },
                notEmpty: {
                    msg: "Et le mot de passe ?"
                }
            }
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
            allowNull: true
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
        }
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                const hash = bcrypt.genSaltSync(12);
                user.password = bcrypt.hashSync(user.password, hash);
            },
            beforeUpdate(user, options) {
                if (user.password && options.fields.includes("password")) {
                    const hash = bcrypt.genSaltSync(12);
                    user.password = bcrypt.hashSync(user.password, hash);
                }
            }
        },
        sequelize,
        modelName: "users",
    });
    users.prototype.validatePassword = function (password) {
        try {
            return bcrypt.compareSync(password, this.password);
        } catch (err) {
            console.error(err);
        }
    };
    users.prototype.generatePasswordReset = function () {
        this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
        this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour

        this.save();
        return this.resetPasswordToken;
    };
    return users;
};
