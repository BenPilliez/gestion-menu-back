const models = require('../db/models')

module.exports = {

    /**
     * Retourne les propositions de la semaine
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    propAll: async (req, res) => {
        console.debug('back => propController => propAll')
        try {

            const props = await models.propositions.findAll({
                where: {
                    week: req.body.week
                }
            })

            return res.status(200).json({count: props.count, rows: props.rows})

        } catch (e) {
            console.error(e);
            return res.status(500).json({error: e})
        }
    },
    /**
     * Retourne les propositions d'un jour
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    propGet: async (req, res) => {
        console.debug("back => propController => propGet")
        try {

            const props = await models.propositions.findAndCountAll({
                where: {
                    day: req.params.day,
                    month: req.body.month
                }
            })

            return res.status(200).json({count: props.count, rows: props.rows})

        } catch (e) {
            console.error(e)
            return res.status(500).json({error: e})
        }
    },
    /**
     * Créer une proposition
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    propCreate: async (req, res) => {

        try {

            const prop = await models.propositions.create(req.body)

            return res.status(200).json(prop)

        } catch (e) {
            console.error(e)
            return res.status(500).json({error: e})
        }

    },
    /**
     * Met à jour une proposition
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    propUpdate: async (req, res) => {
        try {

            const prop = await models.propositions.findByPk(req.params.id)

            if (!prop) {
                return res.status(404).json({error: 'Pas de proposition'})
            }

            prop.update(req.body)

            return res.status(200).json('Ta proposition a été mise à jourl')

        } catch (e) {
            console.error(e)
            return res.status(500).json({error: e})
        }

    },
    /**
     * Supprime une proposition
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    propDelete: async (req, res) => {

        try {

            const prop = await models.propositions.findByPk(req.params.id)

            if (!prop) {
                return res.status(404).json({error: 'Pas de proposition'})
            }

            prop.destroy()

            return res.status(200).json('Proposition supprimé')

        } catch (e) {
            console.error(e)
            return res.status(500).json({error: e})
        }

    }

}
