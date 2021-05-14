import { Aluguel } from './aluguel.model';

export interface Caixa {
    id?: string;
    tipoLancamento?: 'C' | 'D';
    data?: Date | string;
    valor?: number;
    descricao?: string;
    aluguel?: Aluguel;
    aluguelId?: string;
    contaDeConsumo?: boolean;
    cancelado?: boolean;
    motivoCancelamento?: string;
}
