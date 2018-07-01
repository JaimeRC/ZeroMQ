"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const port = process.env.PORT_EXPRESS;
const index_1 = require("./Proxy/index");
const PullPush_1 = __importDefault(require("./PullPush"));
const express = require('express'), bodyParser = require('body-parser'), app = express(), jsonBodyParser = bodyParser.json();
app.post('/example/proxy', jsonBodyParser, index_1.proxy);
app.post('/example/pullpush', jsonBodyParser, PullPush_1.default);
app.listen(port, () => { console.log(`Server running in port ${port}`); });
//# sourceMappingURL=app.js.map