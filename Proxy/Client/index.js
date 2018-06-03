require('../config/enviroment')

const zmq = require('zeromq'),
    req = zmq.socket('req'),
    ipClient = `tcp://${IP_BROKER}:${PORT_CLIENT_BROKER}`;

module.exports = {

    conection() {
        req.connect(ipClient)
        req.identity = 'client_proxy'
    },

    sendMessage(msg) {
        this.conection();

        let query = JSON.stringify(msg)
        console.log("Client: " + query)
        req.send(query)
    },

    getMessage() {
        return new Promise((resolve, reject) => {
            req.on('message', function (data) {
                console.log(idClient + " <- '" + data + "'");

                resolve(data)
            })
        })
    },
    disconection() {
        req.close()
    }
}