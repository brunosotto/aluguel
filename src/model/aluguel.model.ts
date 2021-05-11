import { Contrato } from './contrato.model';

export interface Aluguel {
    id?: string;
    sequencia?: string;
    contrato?: Contrato;
    contratoId?: string;
    vencimento?: Date;
    valor?: number;
    valorPago?: number;
    dataPagamento?: Date;
    aluguelOrigem?: Aluguel;
    aluguelOrigemId?: string;
    isParcial?: boolean;
    motivoCancelamento?: string;
    status?: AluguelStatus;
}

export type AluguelStatus = 'Q' | 'D' | 'C';
