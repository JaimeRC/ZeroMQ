require('../config/enviroment')

const zmq = require('zeromq'),
    req = zmq.socket('req'),
    ipWorker = `tcp://${IP_BROKER}:${PORT_WORKER_BROKER}`;

module.exports = {

    conection() {
        req.identity = "worker_proxy"
        req.connect(ipWorker)

        this.sendMessage("READY")
    },

    sendMessage(msg) {
        req.send(msg) 
    }, 

    getMessage() { 
        req.on('message', function () { 

            console.log("worker " + Array.apply(null, arguments))

            let buffer = Array.apply(null, arguments),
                idWorker = buffer[0],
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