"use strict";
require('dotenv').config();
const index_1 = require("./Client/index");
const broker = require("./Broker/index");
const index_2 = require("./Worker/index");
const { env: { HOST, PORT_CLIENT_BROKER, PORT_WORKER_BROKER } } = process, idClient = `client_proxy_${process.pid}`, ipClient = `tcp://${HOST}:${PORT_CLIENT_BROKER}`, idWorker = `worker_proxy_${process.pid}`, ipWorker = `tcp://${HOST}:${PORT_WORKER_BROKER}`;
module.exports = (req, res) => {
    const { body } = req;
    broker.loadBroker();
    let client = new index_1.Client(idClient, ipClient, body);
    let worker = new index_2.Worker(idWorker, ipWorker);
    setTimeout(() => {
        worker.conection();
        client.conection();
        client.sendMessage();
    }, 10);
    client.getMessage()
        .then((data) => {
        res.statusCode = 200;
        res.json(data);
        client.disconection();
    })
        .catch((err) => {
        res.statusCode = 500;
        res.json(err);
    });
};
//# sourceMappingURL=index.js.map