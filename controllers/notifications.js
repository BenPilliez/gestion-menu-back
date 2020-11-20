const models = require('../db/models')

module.exports = {

    get_notifications: async (req,res) => {
        console.debug('app => controller => get_notifications')

        try{
            const notifications = await models.notifications.findAll({
                where:{
                    usersId: req.user.userId,
                    read: false
                }
            });

            if(!notifications){
                return res.sendStatus(404)
            }

            return res.status(200).json(notifications)

        }catch(e){
            console.error(e)
            return res.status(500).json({error: e})
        }
    },
    delete_notifications: async (req,res) => {
        console.debug("app => controller => delete_notifications")

        try{

            const notification = await models.notifications.findOne({
                usersId: req.user.usersId,
                propositionsId: req.params.prop_id
            })

            notification.destroy()

            return res.sendStatus(200)

        }catch(e){
            console.error(e)
            return res.status(500).json({error: e})
        }
    }
}
