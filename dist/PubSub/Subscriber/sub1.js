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
const HOST = process.env.HOST, PORT_PUB_SUB = process.env.PORT_PUB_SUB, sub = zmq.socket('sub'), ip = `tcp://${HOST}:${PORT_PUB_SUB}`, channel = 'PubSub';
module.exports = {
    conection() {
        sub.connect(ip);
        sub.subscribe(channel);
    },
    getMessage() {
        sub.on('message', function (msg) {
            console.log('Subcrite1 recibido: ' + msg.toString());
        });
    }
};
//# sourceMappingURL=sub1.js.map