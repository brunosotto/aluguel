import { Imovel } from './imovel.model';
import { Inquilino } from './inquilino.model';

export interface Contrato {
    id?: string;
    imovel?: Imovel;
    imovelId?: string;
    inquilino?: Inquilino;
    inquilinoId?: string;
    valor?: number;
    dataInicio?: Date;
    dataEncerramento?: Date;
    diaVencimento?: number;
    antecipado?: boolean;
    obs?: string;
    obsoleto?: boolean;
}
