import { Imovel } from './imovel.model';
import { Inquilino } from './inquilino.model';

export interface Contrato {
    id?: string;
    imovel?: Imovel;
    imovelId?: string;
    inquilino?: Inquilino;
    inquilinoId?: string;
    valor?: number;
    dataInicio?: string;
    dataEncerramento?: string;
    diaVencimento?: number;
    sequencia?: string;
    antecipado?: boolean;
    obs?: string;
    obsoleto?: boolean;
}
