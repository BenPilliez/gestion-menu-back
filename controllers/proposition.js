const models = require('../db/models')
const {Socket} = require('../helpers/socket')

module.exports = {

    /**
     * Retourne toutes les propositions de la semaine
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    propAll: async (req, res) => {
        console.debug('back => propController => propAll')
        try {

            const props = await models.propositions.findAndCountAll({
                where: {
                    week: req.body.week
                },
                include: [{
                    model: models.users,
                    attributes: ['id', 'username', 'avatarUrl']
                }]
            })

            return res.status(200).json({count: props.count, rows: props.rows})

        } catch (e) {
            console.error(e);
            return res.status(500).json({error: e})
        }
    },
    /**
     * Retourne les propositions du jour de la semaine sélectionnées via un select
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    propGetWeekList: async (req, res) => {
        console.debug("back => propController => propGet")
        try {

            const props = await models.propositions.findAndCountAll({
                where: {
                    day: req.params.day,
                    week: req.query.week
                },
                include: [{
                    model: models.users,
                    attributes: ['id', 'username', 'avatarUrl']
                }]
            })

            return res.status(200).json({count: props.count, rows: props.rows})

        } catch (e) {
            console.error(e)
            return res.status(500).json({error: e})
        }
    },
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    propDetails: async (req, res) => {
        console.debug("back => propController => propDetails")
        try {
            const prop = await models.propositions.findByPk(req.params.id,
                {
                    include: {
                        model: models.users,
                        attributes: ['avatarUrl', 'id', 'username']
                    }
                })

            if (!prop) {
                return res.status(404).json({error: "Aucune proposition avec cet identifiant"})
            }

            return res.status(200).json(prop)

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

            let body = req.body
            body.usersId = req.user.userId
            body.imageUrl = req.file ? req.file.filename : 'pasta.jpg'
            body.period = req.body.periodValue

            const prop = await models.propositions.create(body)
            Socket.emit('PropCreated', prop)
            return res.status(200).json(prop)

        } catch (e) {
            console.error(e)
            return res.status(500).json({error: e.message})
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
            let body = req.body
            body.usersId = req.user.userId
            body.imageUrl = req.file ? req.file.filename : prop.imageUrl
            body.period = req.body.periodValue

            prop.update(body)

            return res.status(200).json('Ta proposition a été mise à jour')

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

    },
    /**
     * Créer une proposition
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    propCopy: async (req, res) => {

        try {

            let copyProps = await models.propositions.findByPk(req.params.id,
                {
                    attributes:['content', 'imageUrl', 'usersId', 'period','title', 'description']
                });

            let newProps= {
                content: copyProps.content,
                imageUrl: copyProps.imageUrl,
                usersId: copyProps.usersId,
                period: copyProps.period,
                title: copyProps.title,
                description: copyProps.description,
                week: req.body.week,
                day: req.body.day
            }

            const prop = await models.propositions.create(newProps)

            return res.status(200).json(prop)

        } catch (e) {
            console.error(e)
            return res.status(500).json({error: e.message})
        }

    }
}
