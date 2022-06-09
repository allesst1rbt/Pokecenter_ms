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
const Clientes_1 = __importDefault(require("./Database/Clientes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/cliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Clientes_1.default.createCliente(req.body).then(cliente => {
        res.status(201).json(cliente);
    }).catch(err => {
        if (err.code && err.code === "P2002") {
            res.status(409).json('telefone ja esta em uso');
        }
        res.status(422).json(err.message);
    });
}));
app.get('/cliente/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Clientes_1.default.findCliente(parseInt(id)).then(cliente => {
        res.status(200).json(cliente);
    }).catch(err => {
        res.status(404).json(err.message);
    });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
