require('../config/enviroment')

const zmq = require('zeromq'),
    frontend = zmq.socket('router'),
    backend = zmq.socket('router'),
    ipClient = `tcp://${IP_BROKER}:${PORT_CLIENT_BROKER}`,
    ipWorker = `tcp://${IP_BROKER}:${PORT_WORKER_BROKER}`;

var workers = [] // list of available worker id's

module.exports = {

    loadFrontend() {

        frontend.identity = 'frontend_proxy'
        frontend.bind(ipClient, function (err) {
            if (err) throw err;

            console.log("Frontend en escucha: " + frontend.identity)

            frontend.on('message', function () {

                let buffer = Array.apply(null, arguments),
                    idClient = buffer[0],
                    empty = buffer[1],
                    query = buffer[2];

                var interval = setInterval(function () {

                    if (workers.length > 0) {
                        console.log(query)
                        backend.send([workers.shift(), '', idClient, '', query])
                        clearInterval(interval)
                    }

                }, 10)
            });
        });
    },

    loadBackend() {

        backend.identity = 'backend_proxy'
        backend.bind(ipWorker, function (err) {
            if (err) throw err;

            console.log("Backend en escucha: " + backend.identity)

            backend.on('message', function () {

                let buffer = Array.apply(null, arguments),
                    idWorker = buffer[0],
                    empty0 = buffer[1],
                    idClient = buffer[2],
                    empty1 = buffer[3],
                    query = buffer[4]; 

                workers.push(idClient.toString())

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