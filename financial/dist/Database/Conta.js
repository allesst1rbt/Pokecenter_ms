"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const NotFound_1 = require("../Errors/NotFound");
const TransactionError_1 = require("../Errors/TransactionError");
const prisma = new client_1.PrismaClient();
const Conta = {
    saldo: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const conta = yield prisma.conta.findUnique({
            where: {
                cliente_id: id
            }
        });
        if (conta === null) {
            throw new NotFound_1.NotFoundError("Conta não encontrada para o cliente");
        }
        const saldoReturn = {
            saldo: conta.saldo
        };
        return saldoReturn;
    }),
    transacao: (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const retorno = yield Conta.saldo(id);
        if (retorno.saldo !== undefined) {
            const saldo = (_a = retorno === null || retorno === void 0 ? void 0 : retorno.saldo.toNumber()) !== null && _a !== void 0 ? _a : 0;
            if (payload.tipo == 'debito') {
                if (saldo < payload.valor) {
                    throw new TransactionError_1.TransactionError("Saldo insuficiente");
                }
                const newSaldo = saldo - payload.valor;
                yield prisma.conta.update({
                    where: {
                        cliente_id: id
                    },
                    data: {
                        saldo: newSaldo
                    }
                });
                yield prisma.transacoes.create({
                    data: {
                        cliente_id: id,
                        valor: payload.valor,
                        descricao: "debito"
                    }
                });
                return "Transação realizada com sucesso";
            }
            if (payload.tipo == 'credito') {
                const newSaldo = saldo + payload.valor;
                yield prisma.conta.update({
                    where: {
                        cliente_id: id
                    },
                    data: {
                        saldo: newSaldo
                    }
                });
                yield prisma.transacoes.create({
                    data: {
                        cliente_id: id,
                        valor: payload.valor,
                        descricao: "credito"
                    }
                });
                return "Transação realizada com sucesso";
            }
            throw new TransactionError_1.TransactionError("Tipo de transação inválido");
        }
    })
};
exports.default = Conta;
