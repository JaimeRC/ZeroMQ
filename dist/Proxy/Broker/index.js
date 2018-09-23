"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
require('dotenv').config();
const zmq = __importStar(require("zeromq"));
const index_1 = require("../Worker/index");
const { env: { HOST, PORT_CLIENT_BROKER, PORT_WORKER_BROKER } } = process, ipBrokerClient = `tcp://${HOST}:${PORT_CLIENT_BROKER}`, ipBrokerWorker = `tcp://${HOST}:${PORT_WORKER_BROKER}`, idWorker = `worker_proxy_${process.pid}`;
let frontend = zmq.socket('router'), backend = zmq.socket('router');
let workers = [];
module.exports = {
    loadFrontend() {
        frontend.identity = 'frontend_proxy' + process.pid;
        frontend.bind(ipBrokerClient, function (err) {
            if (err)
                throw err;
            console.log("Frontend en escucha: " + frontend.identity);
            frontend.on('message', function (...buffer) {
                let idClient = buffer[0], empty = buffer[1], query = buffer[2];
                let interval = setInterval(function () {
                    if (workers.length > 0) {
                        console.log("Frontend envia: " + query);
                        backend.send([workers.shift(), '', idClient, '', query]);
                        clearInterval(interval);
                    }
                }, 10);
            });
        });
    },
    loadBackend() {
        backend = zmq.socket('router');
        backend.identity = 'backend_proxy' + process.pid;
        backend.bind(ipBrokerWorker, function (err) {
            if (err)
                throw err;
            console.log("Backend en escucha: " + backend.identity);
            backend.on('message', function (...buffer) {
                console.log(buffer);
                let idWorker = buffer[0], empty0 = buffer[1], idClient = buffer[2], empty1 = buffer[3], query = buffer[4];
                workers.push(idClient.toString());
                console.log("Worker disponible: " + idClient);
                frontend.send("HOLA");
                if (workers[0] != "READY") {
                    frontend.send([idClient, empty0, query]);
                }
            });
        });
    },
    loadBroker() {
        this.loadFrontend();
        this.loadBackend();
        setTimeout(() => new index_1.Worker(idWorker, ipBrokerWorker).conection(), 10);
    }
};
//# sourceMappingURL=index.js.map