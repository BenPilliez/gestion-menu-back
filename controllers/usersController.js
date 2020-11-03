const models = require('../db/models')

module.exports = {

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<this>}
     */
    getUser: async (req, res) => {
        console.debug("back => usersController => getUser")
        try {
            const user = await models.users.findByPk(req.params.id)

            if (!user) {
                return res.status(404).json({error: 'Aucun utilisateur'})
            }

            return res.status(200).json(user)

        } catch (e) {
            console.error(e);
            return res.status(500).json({error: e})
        }
    },

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<this>}
     */
    updateUserAvatar: async (req, res) => {
        console.debug("back => usersController => updateUserAvatar")
        try {
            const user = await models.users.findByPk(req.params.id)

            if (!user) {
                return res.status(404).json({error: 'Aucun utilisateur'})
            }

            const file = req.file ? req.file.filename : null

            user.update({
                avatarUrl: file
            })

        } catch (e) {
            console.error(e)
            return res.status(500).json({error: e})
        }
    },
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<this>}
     */
    updatePassword: async (req, res) => {
        console.debug("back => usersController => updatePassword")
        try {

            let user = await models.users.findByPk(req.params.id)

            if (!user) {
                return res.status(404).json({error: 'Aucun utilisateur'})
            }

            try {
                user.validatePassword(req.body.password)
            } catch (e) {
                console.error('Ancien mot de passe correspond pas')
                return res.status(401).json({
                    error: 'L\'ancien mot de passe ne correspond pas'
                })
            }

            user.update({
                password: req.body.password
            })

            return res.status(200).json('Ton mot de passe a été mis à jour')

        } catch (e) {
            console.error(e)
            return res.status(500).json({error: e})
        }
    }
}
