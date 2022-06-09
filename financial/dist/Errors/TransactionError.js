"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionError = void 0;
class TransactionError extends Error {
    constructor(message) {
        super(message);
        this.name = "TransactionError";
    }
}
exports.TransactionError = TransactionError;
