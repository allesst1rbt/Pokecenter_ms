import { PrismaClient, clientes, Prisma } from '@prisma/client'
import { NotFoundError } from '../Errors/NotFound';
import { TransactionError } from '../Errors/TransactionError';
const prisma = new PrismaClient()


type transacaoPayload = {
    valor: number,
    tipo: "debito" | "credito",
}
type saldoReturn = {
    saldo: Prisma.Decimal | undefined
}
type Conta = {
    saldo: (id: number) => Promise<saldoReturn>,
    transacao: (id: number, payload: transacaoPayload) => Promise<string | undefined>
}
const Conta: Conta = {
    saldo: async (id: number) => {
        const conta = await prisma.conta.findUnique({
            where: {
                cliente_id: id
            }
        })
        if (conta === null) {
            throw new NotFoundError("Conta não encontrada para o cliente");
        }
        const saldoReturn: saldoReturn = {
            saldo: conta.saldo
        }
        return saldoReturn
    },
    transacao: async (id: number, payload: transacaoPayload) => {
        const retorno = await Conta.saldo(id);
        if (retorno.saldo !== undefined) {
            const saldo = retorno?.saldo.toNumber() ?? 0;

            if (payload.tipo == 'debito') {
                if (saldo < payload.valor) {
                    throw new TransactionError("Saldo insuficiente");
                }
                const newSaldo = saldo - payload.valor;
                await prisma.conta.update({
                    where: {
                        cliente_id: id
                    },
                    data: {
                        saldo: newSaldo
                    }
                });
                await prisma.transacoes.create({
                    data: {
                        cliente_id: id,
                        valor: payload.valor,
                        descricao: "debito"
                    }
                })
                return "Transação realizada com sucesso";
            }
            if (payload.tipo == 'credito') {
                const newSaldo = saldo + payload.valor;
                await prisma.conta.update({
                    where: {
                        cliente_id: id
                    },
                    data: {
                        saldo: newSaldo
                    }
                });
                await prisma.transacoes.create({
                    data: {
                        cliente_id: id,
                        valor: payload.valor,
                        descricao: "credito"
                    }
                })
                return "Transação realizada com sucesso";
            }
            throw new TransactionError("Tipo de transação inválido");
        }
    }
}

export default Conta