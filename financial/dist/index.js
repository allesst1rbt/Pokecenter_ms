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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const Conta_1 = __importDefault(require("./Database/Conta"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/saldo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_do_cliente } = req.query;
    yield Conta_1.default.saldo(parseInt(id_do_cliente)).then(saldo => {
        res.status(200).json(saldo);
    }).catch(err => {
        res.status(404).json(err.message);
    });
}));
app.post('/transacao', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_do_cliente } = req.query;
    yield Conta_1.default.transacao(parseInt(id_do_cliente), req.body).then(retorno => {
        res.status(201).json(retorno);
    }).catch(err => {
        if (err.name === "TransactionError") {
            res.status(422).json(err.message);
        }
        res.status(404).json(err.message);
    });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
