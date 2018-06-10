const push = require('./Producer'),
    pull = require('./Worker')

module.exports = (req, res) => {

    const { body } = req;

    push.conection()
    pull.conection()

    push.sendMessage(body)
}