"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./Server");
exports.server = new Server_1.default();
exports.server.start(4000);
