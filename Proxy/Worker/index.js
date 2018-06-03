require('dotenv').config()
const { env: { HOST, PORT_WORKER_BROKER, DISPO } } = process
const ipWorker = `tcp://${HOST}:${PORT_WORKER_BROKER}`

module.exports = {

    const: zmq = require('zeromq'),
    const: worker = zmq.socket('req'),

    conection() {
        worker.identity = 'worker_proxy' + process.pid
        worker.connect(ipWorker)

        this.sendMessage(DISPO)
    },

    sendMessage(msg) {
        worker.send(msg)
    },

    getMessage() {
        worker.on('message', function (...buffer) {
            console.log(buffer)

            let idWorker = buffer[0],
                empty0 = buffer[1],
                idClient = buffer[2],
                empty1 = buffer[3],
                quey = buffer[4]

            let msg = JSON.parse(query)

            if (msg.request === "¿Hola Pajarito?") {
                msg.response = "Pio Pio"
                msg.status = "OK"
            } else {
                msg.response = "Muuuuuu"
                msg.status = "KO"
            }

            let response = JSON.stringify(msg)

            console.log(idWorker)

            this.sendMessage([idClient, empty0, query])
        })
    }
}