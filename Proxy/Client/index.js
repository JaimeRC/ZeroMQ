require('dotenv').config()
const { env: { HOST, PORT_CLIENT_BROKER } } = process
const zmq = require('zeromq'),
    ipClient = `tcp://${HOST}:${PORT_CLIENT_BROKER}`

let req;

module.exports = {

    conection() {
        req = zmq.socket('req')
        req.connect(ipClient)
        req.identity = 'client_proxy' + process.pid
    },

    sendMessage(msg) {
        this.conection();

        let query = JSON.stringify(msg)

        console.log("Client: " + query)

        req.send(query)
    },

    getMessage() {
        return new Promise((resolve, reject) => {
            req.on('message', function (...buffer) {
                console.log(idClient + " <- '" + buffer + "'");

                resolve(buffer)
            })
        })
    },
    disconection() {
        req.close()
    }
}