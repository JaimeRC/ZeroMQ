require('dotenv').config()

module.exports = {

    const: { env: { HOST_BROKER, PORT_CLIENT_BROKER, PORT_WORKER_BROKER } } = process,
    const: zmq = require('zeromq'),
    const: frontend = zmq.socket('router'),
    const: backend = zmq.socket('router'),
    const: ipClient = `tcp://${HOST_BROKER}:${PORT_CLIENT_BROKER}`,
    const: ipWorker = `tcp://${HOST_BROKER}:${PORT_WORKER_BROKER}`,
    let: workers = [],

    loadFrontend() {


        frontend.identity = 'frontend_proxy' + process.pid
        frontend.bind(ipClient, function (err) {
            if (err) throw err;

            console.log("Frontend en escucha: " + frontend.identity)

            frontend.on('message', function (...buffer) {

                let idClient = buffer[0],
                    empty = buffer[1],
                    query = buffer[2]

                var interval = setInterval(function () {

                    if (workers.length > 0) {
                        console.log("Frontend envia: " + query)
                        backend.send([workers.shift(), '', idClient, '', query])
                        clearInterval(interval)
                    }
 
                }, 10)
            });
        });
    },

    loadBackend() {

        backend.identity = 'backend_proxy' + process.pid
        backend.bind(ipWorker, function (err) {
            if (err) throw err;

            console.log("Backend en escucha: " + backend.identity)

            backend.on('message', function (...buffer) {

                let idWorker = buffer[0],
                    empty0 = buffer[1],
                    idClient = buffer[2],
                    empty1 = buffer[3],
                    query = buffer[4]

                workers.push(idClient.toString())

                console.log("Worker disponible: " + idClient)
                frontend.send("HOLA")

                if (workers[0] != "READY") {
                    frontend.send([idClient, empty0, query])
                }
            })
        })
    },

    loadBroker() {
        this.loadFrontend();
        this.loadBackend();
    }
}  