const models = require("../db/models");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {Op} = require("sequelize");

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<this>}
     */
    passwordRecover: async (req, res) => {
        try {
            const user = await models.users.findOne(
                {
                    where: {
                        email: req.body.email
                    }
                }
            );

            if (!user) {
                return res.status(404).json({error: "Aucun utilisateur"});
            }

            const resetToken = user.generatePasswordReset();

            const link = `${process.env.FRONT_URL}/auth/reset/${resetToken}`;

            const msg = {
                to: user.email,
                from: process.env.MAIL_FROM,
                subject: "Réinitialisation du mot de passe",
                text: `Salut, ${user.username}, tu as fait une demande de réinitialisation pour ton mot de passe \n
                    Tu peux cliquer sur ce lien ${link} pour la faire
                    Si c'est pas toi ignore cet email, ton mot de passe ne sera pas changer`,
            };

            try {

                await sgMail.send(msg);
                console.log(link);
                return res.status(200).json("Un email contenant ton lien de réinitialisation a été envoyé");

            } catch (e) {
                console.error(e);
                return res.status(500).json({error: "Un problème est survenue pendant l'envoi du mail"});
            }


        } catch (e) {
            console.error(e);
            return res.status(500).json({error: e});
        }
    },

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<this>}
     */
    resetPassword: async (req, res) => {
        console.debug("back => passwordResetController => resetPassword");
        try {
            const user = await models.users.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    [Op.gte]: Date.now()
                }
            });

            if (!user) {
                return res.status(400).json({error: "Le token est invalide ou il a expiré"});
            }

            try {
                await user.update({
                    password: req.body.password,
                    resetPasswordToken: null,
                    resetPasswordExpires: null
                });
                return res.status(200).json("Mot de passe mis à jour");

            } catch (e) {
                console.error(e);
                return res.status(500).json({error: e});
            }


        } catch (e) {
            console.error(e);
            return res.status(500).json({error: e});
        }
    }

};
