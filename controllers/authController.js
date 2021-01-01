const models = require("../db/models");
const jwt = require("jsonwebtoken");
const {Op} = require("sequelize");
const moment = require("moment");
require("moment/locale/fr");

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<this>}
     */
    signup: async (req, res) => {
        console.debug("back => authController => signup");
        try {
            const user = await models.users.create(req.body);
            return res.status(201).json({
                email: user.email,
                username: user.username,
                id: user.id
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },
    signin: async (req, res) => {
        console.debug("app => authController => signin");

        try {

            let user = await models.users.findOne({
                where: {
                    username: req.body.username
                },
                attributes: ["id", "email", "username", "password", "avatarUrl"]
            });

            if (!user) {
                console.debug("User incorrect");
                return res.status(401).json({error: "Utilisateur ou mot de passe incorrect"});
            }

            let password = user.validatePassword(req.body.password, user.password);
            if (!password) {
                console.debug("Password incorrect");
                return res.status(401).json({error: "Utilisateur ou mot de passe incorrect"});
            }

            let token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                    username: user.username
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                    audience: process.env.AUDIENCE,
                    issuer: process.env.ISSUER
                }
            );
            return res.status(200).json({
                user:
                    {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        avatarUrl: user.avatarUrl,
                        notifications: user.notifications
                    },
                token: token
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },
    account: async (req, res) => {
        try {

            let currentWeek = moment().week();
            let numberLastWeekOfMonth = moment().endOf("month").week();

            let props = await models.propositions.findAndCountAll({
                where: {
                    usersId: req.user.userId,
                    week: {
                        [Op.between]: [currentWeek, numberLastWeekOfMonth]
                    },
                }
            });

            const currentDate = moment();

            if (props.count > 0) {
                let filterArray = await props.rows.filter((item) => {
                    const date = moment().day(item.day).week(item.week);
                    return date.isSameOrAfter(currentDate);

                }).sort(function (a, b) {
                    let dateA = moment(a.date);
                    let dateB = moment(b.date);

                    return dateA.subtract(dateB);
                });

                return res.json({
                    totalItems: filterArray.length,
                    items: filterArray,
                    totalPages: Math.ceil(filterArray.length / 10)
                });
            }
            return res.status(200).json("Tu n'as encore rien proposé");
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    }

};
