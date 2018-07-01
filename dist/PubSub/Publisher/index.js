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
const HOST = process.env.HOST, PORT_PUB_SUB = process.env.PORT_PUB_SUB, pub = zmq.socket('pub'), ip = `tcp://${HOST}:${PORT_PUB_SUB}`, channel = 'PubSub';
module.exports = {
    conection() {
        pub.bind(ip);
    },
    sendMessage(msg) {
        let query = JSON.stringify(msg);
        pub.send([channel, query]);
    }
};
//# sourceMappingURL=index.js.map