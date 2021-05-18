export interface QuitarAluguel {
    pagamento?: PagamentoType;
    valor?: number;
    valorPago?: number;
    obs?: string;
}

export type PagamentoType = 'T' | 'P';
