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
        return input.gerar === 'T' ? this.gerarTodos(competencia) : this.gerarUm(competencia, input.contrato);
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
            data: new Date(),
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
        aluguel.dataPagamento = new Date();
        aluguel.status = 'Q';
        return await this.aluguelService.alterar(aluguel);
    }

    private async criarResidual(aluguel: Aluguel, valor: number): Promise<boolean> {
        const novo = await this.criarAluguel(null, aluguel.contrato, aluguel, valor);
        return await this.aluguelService.insereLote([novo]);
    }

    private async gerarTodos(competencia: number[]): Promise<boolean> {
        const contratos = await this.contratoService.listarAtivos();
        const alugueis: Aluguel[] = [];
        contratos.forEach(async (c) => {
            alugueis.push(await this.criarAluguel(competencia, c));
        });
        return await this.aluguelService.insereLote(alugueis);
    }

    private async gerarUm(competencia: number[], contrato: Contrato): Promise<boolean> {
        const aluguel = await this.criarAluguel(competencia, contrato);
        return await this.aluguelService.insereLote([aluguel]);
    }

    private getCompetencia(competencia: Date): number[] {
        const date = new Date(competencia);
        return [date.getFullYear(), date.getMonth() + 1];
    }

    private async criarAluguel(
        competencia: number[],
        contrato: Contrato,
        aluguelOrigem?: Aluguel,
        valorDiferente?: number,
    ): Promise<Aluguel> {
        return {
            id: uuid(),
            sequencia: aluguelOrigem && aluguelOrigem.sequencia || (await this.aluguelService.getSequencia(contrato)),
            contrato,
            contratoId: contrato.id,
            vencimento: aluguelOrigem && aluguelOrigem.vencimento || new Date([...competencia, contrato.diaVencimento].join('-')),
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
