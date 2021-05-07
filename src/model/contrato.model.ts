import { Imovel } from './imovel.model';
import { Inquilino } from './inquilino.model';

export interface Contrato {
    id?: string;
    imovel?: Imovel;
    inquilino?: Inquilino;
    valor?: number;
    dataInicio?: Date;
    dataEncerramento?: Date;
    diaVencimento?: number;
    antecipado?: boolean;
    obs?: string;
    obsoleto?: boolean;
}
