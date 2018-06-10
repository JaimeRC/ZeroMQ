require('dotenv').config()

const { env: { HOST, PORT_PULL_PUSH } } = process

const zmq = require('zeromq'),
    pull = zmq.socket('pull'),
    ip = `tcp://${HOST}:${PORT_PULL_PUSH}`

module.exports = {
    conection() {
        pull.connect(ip)
    },

    getMessage() {
        pull.on('message', function (msg) {
            console.log('Worker recibido: ' + msg.toString())
        })
    }
}