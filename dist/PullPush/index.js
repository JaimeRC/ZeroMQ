"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Producer_1 = __importDefault(require("./Producer"));
const Worker_1 = __importDefault(require("./Worker"));
module.exports = (req, res) => {
    const { body } = req;
    Producer_1.default.conection();
    Worker_1.default.conection();
    Producer_1.default.sendMessage(body);
};
//# sourceMappingURL=index.js.map