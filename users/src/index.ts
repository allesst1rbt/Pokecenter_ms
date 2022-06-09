import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Clientes from './Database/Clientes'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post('/cliente', async (req: Request, res: Response) => {
  
  await Clientes.createCliente(req.body).then(cliente =>{
    res.status(201).json(cliente)
  }).catch(err =>{
    if(err.code && err.code ==="P2002"){
      res.status(409).json('telefone ja esta em uso')
    }
    res.status(422).json(err.message)
  });
});

app.get('/cliente/:id', async (req: Request, res: Response) => {
  const {id} = req.params;
  await Clientes.findCliente(parseInt(id)).then(cliente =>{
    res.status(200).json(cliente)
  }).catch(err =>{
    res.status(404).json(err.message)
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});