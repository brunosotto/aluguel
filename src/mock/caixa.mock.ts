import { Caixa } from '../model/caixa.model';
import moment from 'moment';

export const lancamentosMock: Caixa[] = [
    {
        id: '2fa1',
        tipoLancamento: 'C',
        data: moment('2021-01-15').toISOString(),
        valor: 35,
        descricao: 'Teste 123\nLinha de baixo',
        aluguel: {
            id: '2fa2',
            contrato: {
                id: '2fa3',
                inquilino: {
                    id: '2fa4',
                    nome: 'Gilson',
                },
                imovel: {
                    id: '2fa5',
                    nome: 'Casa 1',
                }
            }
        },
    },
    {
        id: '2fa6',
        tipoLancamento: 'C',
        data: moment('2021-03-19').toISOString(),
        valor: 86,
        descricao: 'Outros',
        cancelado: true,
        motivoCancelamento: 'Cancelado teste\nLinha 2',
    },
    {
        id: '2fa7',
        tipoLancamento: 'D',
        data: moment('2021-03-23').toISOString(),
        valor: 258.65,
        descricao: 'Despesas\nLinha 2\nLinha 3',
    },
    {
        id: '2fa8',
        tipoLancamento: 'C',
        data: moment('2021-03-23').toISOString(),
        valor: 65784.65,
        descricao: 'Despesas\nLinha 2\nLinha 3',
    },
    {
        id: '2fa9',
        tipoLancamento: 'D',
        data: moment('2021-03-23').toISOString(),
        valor: 874.65,
        descricao: 'Despesas\nLinha 2\nLinha 3',
    },
    {
        id: '2fb0',
        tipoLancamento: 'C',
        data: moment('2021-03-23').toISOString(),
        valor: 52.87,
        descricao: 'Despesas\nLinha 2\nLinha 3',
    },
    {
        id: '2fb1',
        tipoLancamento: 'D',
        data: moment('2021-03-23').toISOString(),
        valor: 22.33,
        descricao: 'Despesas\nLinha 2\nLinha 3',
    },
    {
        id: '2fb2',
        tipoLancamento: 'C',
        data: moment('2021-03-23').toISOString(),
        valor: 745.21,
        descricao: 'Despesas\nLinha 2\nLinha 3',
    },
    {
        id: '2fb3',
        tipoLancamento: 'D',
        data: moment('2021-03-23').toISOString(),
        valor: 456.32,
    },
    {
        id: '2fb4',
        tipoLancamento: 'C',
        data: moment('2021-03-23').toISOString(),
        valor: 756.98,
    },
    {
        id: '2fb5',
        tipoLancamento: 'D',
        data: moment('2021-03-23').toISOString(),
        contaDeConsumo: true,
        valor: 77898.32,
    },
    {
        id: '2fb6',
        tipoLancamento: 'C',
        data: moment('2021-03-23').toISOString(),
        valor: 87.98,
    },
    {
        id: '2fb7',
        tipoLancamento: 'C',
        data: moment('2021-03-23').toISOString(),
        valor: 876.56,
    },
    {
        id: '2fb8',
        tipoLancamento: 'C',
        data: moment('2021-03-23').toISOString(),
        valor: 3541.48,
    },
];
