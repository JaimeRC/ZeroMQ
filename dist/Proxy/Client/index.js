"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const zeromq = __importStar(require("zeromq"));
class Client {
    constructor(id, ipClient) {
        this.id = id;
        this.ipClient = ipClient;
    }
    conection() {
        this.zmq = zeromq.socket('req');
        this.zmq.connect(this.ipClient);
        this.zmq.identity = this.id;
    }
    sendMessage(msg) {
        this.conection();
        let query = JSON.stringify(msg);
        console.log("Client: " + query);
        this.zmq.send(query);
    }
    getMessage() {
        return new Promise((resolve, reject) => {
            this.zmq.on('message', function (...buffer) {
                console.log(this.zmq.identity + " <- '" + buffer + "'");
                let response = JSON.parse(buffer.toString());
                resolve(response);
            });
        });
    }
    disconection() {
        this.zmq.close();
    }
}
exports.Client = Client;
//# sourceMappingURL=index.js.map