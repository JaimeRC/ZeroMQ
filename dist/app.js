"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const PORT = process.env.PORT_EXPRESS;
const ReqRep_1 = __importDefault(require("./ReqRep"));
const PullPush_1 = __importDefault(require("./PullPush"));
const PubSub_1 = __importDefault(require("./PubSub"));
const RouterDealer_1 = __importDefault(require("./RouterDealer"));
const Broker_1 = __importDefault(require("./RouterDealer/Broker"));
const Proxy_1 = __importDefault(require("./Proxy"));
const express = require('express'), bodyParser = require('body-parser'), app = express(), jsonBodyParser = bodyParser.json();
app.post('/example/reqrep', jsonBodyParser, ReqRep_1.default);
app.post('/example/pullpush', jsonBodyParser, PullPush_1.default);
app.post('/example/pubsub', jsonBodyParser, PubSub_1.default);
app.post('/example/proxy', jsonBodyParser, Proxy_1.default);
app.post('/example/routerdealer', jsonBodyParser, RouterDealer_1.default);
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
    // ProxyBroker.loadBroker()
    Broker_1.default.loadBroker();
});
//# sourceMappingURL=app.js.map