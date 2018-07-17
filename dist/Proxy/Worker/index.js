"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zeromq_1 = __importDefault(require("zeromq"));
class Worker {
    constructor(id, ipWorker) {
        this.DISPO = 'READY';
        this.id = id;
        this.ipWorker = ipWorker;
    }
    conection() {
        this.zmq = zeromq_1.default.socket('req');
        this.zmq.identity = this.id;
        this.zmq.connect(this.ipWorker);
        this.sendMessage(this.DISPO);
    }
    sendMessage(msg) {
        this.zmq.send(msg);
    }
    getMessage() {
        this.zmq.on('message', function (...buffer) {
            console.log(buffer);
            let idWorker = buffer[0], empty0 = buffer[1], idClient = buffer[2], empty1 = buffer[3], query = buffer[4];
            let msg = JSON.parse(query.toString());
            if (msg.request === "¿Hola Pajarito?") {
                msg.response = "Pio Pio";
                msg.status = "OK";
            }
            else {
                msg.response = "Muuuuuu";
                msg.status = "KO";
            }
            let response = JSON.stringify(msg);
            console.log(idWorker);
            this.sendMessage([idClient, empty0, response]);
        });
    }
    disconection() {
        //  this.zmq.disconection()
    }
}
exports.Worker = Worker;
//# sourceMappingURL=index.js.map