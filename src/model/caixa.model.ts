import { Aluguel } from './aluguel.model';

export interface Caixa {
    id?: string;
    tipoLancamento?: 'C' | 'D';
    data?: Date;
    valor?: number;
    descricao?: string;
    aluguel?: Aluguel;
    cancelado?: boolean;
    motivoCancelamento?: string;
}
