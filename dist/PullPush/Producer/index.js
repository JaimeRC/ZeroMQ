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
const HOST = process.env.HOST;
const PORT_PULL_PUSH = process.env.PORT_PULL_PUSH;
const push = zmq.socket('push');
const ip = `tcp://${HOST}:${PORT_PULL_PUSH}`;
module.exports = {
    conection() {
        push.bindSync(ip);
    },
    sendMessage(msg) {
        let query = JSON.stringify(msg);
        push.send(query);
    }
};
//# sourceMappingURL=index.js.map