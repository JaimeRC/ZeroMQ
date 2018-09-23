"use strict";
require('dotenv').config();
const index_1 = require("./Client/index");
const { env: { HOST, PORT_CLIENT_BROKER } } = process, idClient = `client_proxy_${process.pid}`, ipClient = `tcp://${HOST}:${PORT_CLIENT_BROKER}`;
module.exports = (req, res) => {
    const { body } = req;
    let client = new index_1.Client(idClient, ipClient);
    client.conection();
    client.sendMessage(body);
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