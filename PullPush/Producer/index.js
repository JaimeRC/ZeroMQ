require('dotenv').config()

const { env: { HOST, PORT_PULL_PUSH } } = process

const zmq = require('zeromq'),
    push = zmq.socket('push'),
    ip = `tcp://${HOST}:${PORT_PULL_PUSH}`

module.exports = {

    conection() {
        push.bindSync(ip)
    },

    sendMessage(msg) {
        let query = JSON.stringify(msg)
        push.send(query)
    }
}