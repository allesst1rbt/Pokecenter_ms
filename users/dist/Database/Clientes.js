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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const validar_telefone_1 = __importDefault(require("validar-telefone"));
const prisma = new client_1.PrismaClient();
const Clientes = {
    createCliente: (req) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!(0, validar_telefone_1.default)(req.telefone)) {
            throw new Error("Telefone inválido");
        }
        const cliente = yield prisma.clientes.create({
            data: {
                nome: req.nome,
                telefone: req.telefone,
                conta: {
                    create: {
                        saldo: (_a = req.saldo) !== null && _a !== void 0 ? _a : 0
                    }
                }
            },
            include: {
                conta: true,
            }
        });
        return cliente;
    }),
    findCliente: (id) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const cliente = yield prisma.clientes.findUnique({
            where: {
                id: id
            },
            include: {
                conta: true
            }
        });
        if (cliente === null) {
            throw new Error("Cliente não encontrado");
        }
        const clienteReturn = {
            id: cliente === null || cliente === void 0 ? void 0 : cliente.id,
            nome: cliente === null || cliente === void 0 ? void 0 : cliente.nome,
            telefone: cliente === null || cliente === void 0 ? void 0 : cliente.telefone,
            saldo: (_b = cliente === null || cliente === void 0 ? void 0 : cliente.conta) === null || _b === void 0 ? void 0 : _b.saldo
        };
        return clienteReturn;
    })
};
exports.default = Clientes;
