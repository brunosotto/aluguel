import { GenerateAluguelInput } from './aluguel-modal/aluguel-modal.page';
import { ContratoService } from '../api/contrato.service';
import { AluguelService } from '../api/aluguel.service';
import { Contrato } from '../../model/contrato.model';
import { Aluguel } from '../../model/aluguel.model';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { QuitarAluguelInput } from './quitar-modal/quitar-modal.page';

@Injectable({
    providedIn: 'root'
})
export class AluguelPageService {

    constructor(
        private contratoService: ContratoService,
        private aluguelService: AluguelService,
    ) {
    }

    public async generateAluguel(input: GenerateAluguelInput): Promise<boolean> {
        const competencia = this.getCompetencia(input.competencia);
        return input.gerar === 'T' ? this.gerarTodos(competencia) : this.gerarUm(competencia, input.contrato);
    }

    public async quitarAluguel(aluguel: Aluguel, quitar: QuitarAluguelInput): Promise<boolean> {
        console.log(aluguel, quitar);
        return true;
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

    private async criarAluguel(competencia: number[], contrato: Contrato, aluguelOrigem?: Aluguel): Promise<Aluguel> {
        return {
            id: uuid(),
            sequencia: await this.aluguelService.getSequencia(contrato),
            contrato,
            contratoId: contrato.id,
            vencimento: new Date([...competencia, contrato.diaVencimento].join('-')),
            valor: contrato.valor,
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
