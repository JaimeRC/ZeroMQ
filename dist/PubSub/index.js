"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Publisher_1 = __importDefault(require("./Publisher"));
module.exports = (req, res) => {
    const { body } = req;
    Publisher_1.default.conection();
    Publisher_1.default.sendMessage(body);
};
//# sourceMappingURL=index.js.map