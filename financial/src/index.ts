import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Conta from './Database/Conta'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/saldo', async(req: Request, res: Response) => {
  const {id_do_cliente} = req.query;
  await Conta.saldo(parseInt(id_do_cliente as string)).then(saldo =>{
    res.status(200).json(saldo)
  }).catch(err =>{
    res.status(404).json(err.message)
  });
});

app.post('/transacao', async(req: Request, res: Response) => {
  const {id_do_cliente} = req.query;
  await Conta.transacao(parseInt(id_do_cliente as string),req.body).then(retorno =>{
    res.status(201).json(retorno)
  }).catch(err =>{
    if( err.name === "TransactionError"){
      res.status(422).json(err.message)
    }
    res.status(404).json(err.message)
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});