import { PrismaClient, clientes, Prisma } from '@prisma/client'
import validator from "validar-telefone";
import { assert, object, string, size, refine } from 'superstruct'
const prisma = new PrismaClient()


type clientRequest = {
    nome: string,
    telefone: string,
    saldo?: number
} 
type clientCustomReturn = {
    id: number | undefined,
    nome: string | undefined,
    telefone: string | undefined,
    saldo: Prisma.Decimal | undefined
} 
type Clientes = {
    createCliente: (req: clientRequest)=>Promise<clientes>,
    findCliente: (id: number)=>Promise<clientCustomReturn>,
}
const Clientes: Clientes = {
    createCliente : async (req: clientRequest)=>{
       
        if(!validator(req.telefone)){
            throw new Error("Telefone inválido");
            
        }
        const cliente = await prisma.clientes.create({
            data: {
                nome: req.nome,
                telefone: req.telefone,
                conta: {
                    create: {
                        saldo: req.saldo ?? 0
                    }
                }
            },
            include: {
                conta: true,
            }
        })

        return cliente
        
        
    },
    findCliente : async (id: number)=>{
        const cliente = await prisma.clientes.findUnique({
            where:{
                id: id
            },
            include:{
                conta: true
            }
        })
        if (cliente === null){
            throw new Error("Cliente não encontrado");
        }
        const clienteReturn: clientCustomReturn = {
            id: cliente?.id,
            nome: cliente?.nome,
            telefone: cliente?.telefone,
            saldo: cliente?.conta?.saldo
        }
        return clienteReturn
    }
}

export default Clientes