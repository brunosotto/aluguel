import { Contrato } from './contrato.model';

export interface Aluguel {
    id?: string;
    sequencia?: string;
    contrato?: Contrato;
    vencimento?: Date;
    valor?: number;
    valorPago?: number;
    dataPagamento?: Date;
    aluguelOrigem?: Aluguel;
    isParcial?: boolean;
    status?: 'Q' | 'D' | 'C';
}
