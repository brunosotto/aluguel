import { GenerateAluguelInput } from './aluguel-modal/aluguel-modal.page';
import { QuitarAluguelInput } from './quitar-modal/quitar-modal.page';
import { ContratoService } from '../api/contrato.service';
import { AluguelService } from '../api/aluguel.service';
import { Contrato } from '../../model/contrato.model';
import { CaixaService } from '../api/caixa.service';
import { Aluguel } from '../../model/aluguel.model';
import { Caixa } from '../../model/caixa.model';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class AluguelPageService {

    constructor(
        private contratoService: ContratoService,
        private aluguelService: AluguelService,
        private caixaService: CaixaService,
    ) {
    }

    public async generateAluguel(input: GenerateAluguelInput): Promise<boolean> {
        const competencia = this.getCompetencia(input.competencia);
        return new Promise(resolve => {
            if (input.gerar === 'T') {
                this.gerarTodos(competencia, resolve);
            } else {
                this.gerarUm(competencia, input.contrato, resolve);
            }
        });
    }

    public async quitarAluguel(aluguel: Aluguel, quitar: QuitarAluguelInput): Promise<boolean> {
        const valorPago = Number(quitar.valorPago);
        const valor = Number(quitar.valor);
        const isParcial = valorPago < valor;

        if (isParcial) {
            await this.criarResidual(aluguel, valor - valorPago);
        }

        await this.pagarAluguel(aluguel, quitar);

        await this.registrarCaixa(aluguel, quitar);

        await this.gerarRecibo(aluguel, quitar);

        return true;
    }

    private async gerarRecibo(aluguel: Aluguel, quitar: QuitarAluguelInput): Promise<boolean> {
        console.log('gerarRecibo', aluguel, quitar);
        return;
    }

    private async registrarCaixa(aluguel: Aluguel, quitar: QuitarAluguelInput): Promise<boolean> {
        const lancamento: Caixa = {
            tipoLancamento: 'C',
            data: moment().toISOString(),
            valor: Number(quitar.valorPago),
            descricao: quitar.obs,
            aluguel,
            aluguelId: aluguel.id,
            contaDeConsumo: false,
            cancelado: false,
            motivoCancelamento: null,
        };
        return await this.caixaService.inserir(lancamento);
    }

    private async pagarAluguel(aluguel: Aluguel, quitar: QuitarAluguelInput): Promise<boolean> {
        aluguel.valorPago = Number(quitar.valorPago);
        aluguel.dataPagamento = moment().toISOString();
        aluguel.status = 'Q';
        return await this.aluguelService.alterar(aluguel);
    }

    private async criarResidual(aluguel: Aluguel, valor: number): Promise<boolean> {
        const novo = await this.criarAluguel(null, aluguel.contrato, aluguel, valor);
        return await this.aluguelService.insereLote([novo]);
    }

    private gerarTodos(competencia: number[], resolve: Resolver): void {
        this.contratoService.listarAtivos().then(contratos => {
            this.gerarCada(competencia, contratos, resolve, []);
        });
    }

    private gerarCada(competencia: number[], contratos: Contrato[], resolve: Resolver, alugueis: Aluguel[]): void {
        if (!!contratos.length) {
            const contrato = contratos.pop();
            this.criarAluguel(competencia, contrato).then(aluguel => {
                alugueis.push(aluguel);
                this.gerarCada(competencia, contratos, resolve, alugueis);
            });
            return;
        }
        this.aluguelService.insereLote(alugueis).then(res => {
            resolve(res);
        });
    }

    private gerarUm(competencia: number[], contrato: Contrato, resolve: Resolver): void {
        this.criarAluguel(competencia, contrato).then(aluguel => {
            this.aluguelService.insereLote([aluguel]).then(res => {
                resolve(res);
            });
        });
    }

    private getCompetencia(competencia: Date): number[] {
        const date = moment(competencia);
        return [date.year(), date.month() + 1];
    }

    private async getSequencia(contrato: Contrato, aluguelOrigem?: Aluguel): Promise<string> {
        if (aluguelOrigem) {
            return aluguelOrigem.sequencia;
        }
        return await this.contratoService.getSequencia(contrato);
    }

    private async criarAluguel(
        competencia: number[],
        contrato: Contrato,
        aluguelOrigem?: Aluguel,
        valorDiferente?: number,
    ): Promise<Aluguel> {
        const sequencia = await this.getSequencia(contrato, aluguelOrigem);
        const vencimento = aluguelOrigem && aluguelOrigem.vencimento ||
            moment([...competencia, contrato.diaVencimento].join('-')).toISOString();
        return {
            id: uuid(),
            sequencia,
            contrato,
            contratoId: contrato.id,
            vencimento,
            valor: valorDiferente || contrato.valor,
            valorPago: null,
            dataPagamento: null,
            aluguelOrigem: aluguelOrigem || null,
            aluguelOrigemId: aluguelOrigem && aluguelOrigem.id || null,
            isParcial: (!!aluguelOrigem ? true : false),
            motivoCancelamento: null,
            status: 'D',
        };
    }

}

type Resolver = (value: boolean | PromiseLike<boolean>) => void;
