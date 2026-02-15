"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarpAgent = void 0;
const x402_stacks_1 = require("x402-stacks");
const axios_1 = __importDefault(require("axios"));
class WarpAgent {
    constructor(config) {
        const account = (0, x402_stacks_1.privateKeyToAccount)(config.privateKey);
        this.client = (0, x402_stacks_1.wrapAxiosWithPayment)(axios_1.default.create(), account);
    }
    async fetch(url, options) {
        const response = await this.client.get(url, options);
        return response.data;
    }
}
exports.WarpAgent = WarpAgent;
