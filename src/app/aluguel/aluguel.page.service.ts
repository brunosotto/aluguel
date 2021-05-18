import { GenerateAluguelInput } from './aluguel-modal/aluguel-modal.page';
import { QuitarAluguelInput } from './quitar-modal/quitar-modal.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ContratoService } from '../api/contrato.service';
import { AluguelService } from '../api/aluguel.service';
import { Contrato } from '../../model/contrato.model';
import { CaixaService } from '../api/caixa.service';
import { Aluguel } from '../../model/aluguel.model';
import { Caixa } from '../../model/caixa.model';
import { File } from '@ionic-native/file/ngx';
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
        private socialSharing: SocialSharing,
        private file: File,
        private pdfGenerator: PDFGenerator,
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
            await this.criarResidual({...aluguel}, valor - valorPago);
        }

        await this.pagarAluguel({...aluguel}, quitar);

        await this.registrarCaixa({...aluguel}, quitar);

        await this.gerarRecibo({...aluguel}, quitar);

        return true;
    }

    private async gerarRecibo(aluguel: Aluguel, quitar: QuitarAluguelInput): Promise<boolean> {
        const options = {
            documentSize: 'A4',
            type: 'base64',
            fileName: 'inquilino.pdf',
        };
        const contrato = aluguel && aluguel.contrato || {};
        const inquilino = contrato.inquilino || {};
        const imovel = contrato.imovel || {};
        this.pdfGenerator.fromData(`<html><h1>Recibo de aluguel</h1><h2>${inquilino.nome} - ${imovel.nome}</h2></html>`, options)
            .then((base64) => {
                const contentType = 'application/pdf';
                const folderpath = this.file.cacheDirectory;
                return this.savebase64AsPDF(folderpath, options.fileName, base64, contentType);
            })
            .then(() => {
                setTimeout(() => {
                    this.socialSharing.share('RECIBO', null, this.file.cacheDirectory + options.fileName, null);
                }, 2000);
            })
            .catch((err) => console.log(err));
        return;
    }

    private b64toBlob(b64Data: string, contentType: string) {
        const sliceSize = 512;
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    private savebase64AsPDF(folderPath: string, fileName: string, content: string, contentType: string): Promise<void> {
        return this.file.writeFile(
            folderPath,
            fileName,
            this.b64toBlob(content, contentType),
            { replace: true }
        );
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
