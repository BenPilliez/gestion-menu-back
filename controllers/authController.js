const models = require('../db/models')
const jwt = require('jsonwebtoken')

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<this>}
     */
    signup: async (req, res) => {
        console.debug('back => authController => signup')
        try {
            const user = await models.users.create(req.body);
            return res.status(201).json({
                email: user.email,
                username: user.username,
                id: user.id
            })

        } catch (err) {
            console.error(err);
            return res.status(500).json(err)
        }
    },
    signin: async (req, res) => {
        console.debug("app => authController => signin");

        try {

            let user = await models.users.findOne({
                where: {
                    username: req.body.username
                },
                attributes: [ 'id', 'email', 'username', 'password']
            });

            if (!user) {
                console.debug("User incorrect")
                return res.status(401).json({error: "Utilisateur ou mot de passe incorrect"});
            }

            let password = user.validatePassword(req.body.password, user.password);
            if (!password) {
                console.debug("Password incorrect")
                return res.status(401).json({error: "Utilisateur ou mot de passe incorrect"});
            }

            let token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '24h',
                    audience: process.env.AUDIENCE,
                    issuer: process.env.ISSUER
                }
            )
            return res.status(200).json({
                user:
                    {
                        id: user.id,
                        email: user.email,
                        username: user.username
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
            let user = await models.users.findByPk(req.user.userId, {
                include: [
                    {
                        model: models.propositions
                    }
                ]
            })
            return res.json(user);
        } catch (err) {
            console.error(err)
            return res.status(500).json(err)
        }
    }

}
