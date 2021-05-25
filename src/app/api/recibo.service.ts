import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ReciboConfig } from '../../model/recibo-config.model';
import { ReciboConfigService } from './recibo-config.service';
import { Aluguel } from '../../model/aluguel.model';
import { File } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';
import extenso from 'extenso';
import moment from 'moment';
import { ToastController } from '@ionic/angular';
@Injectable({
    providedIn: 'root'
})
export class ReciboService {

    private readonly contentType = 'application/pdf';
    private readonly folderPath = this.file.cacheDirectory;
    private config: ReciboConfig;

    constructor(
        private file: File,
        private pdfGenerator: PDFGenerator,
        private socialSharing: SocialSharing,
        private toastController: ToastController,
        private reciboConfig: ReciboConfigService,
    ) {
    }

    public async gerar(aluguel: Aluguel, isParcial: boolean): Promise<boolean> {
        this.config = await this.reciboConfig.obter();

        if (!this.config || !this.config.nomeEmitente) {
            this.presentToast('É necessário configurar o recibo na tela de configurações!');
            return;
        }

        const html = this.template(aluguel, isParcial);
        const fileName = this.reciboName(aluguel, isParcial);
        return await this.gerarRecibo(fileName, html);
    }

    private template(aluguel: Aluguel, isParcial: boolean): string {
        const contrato = aluguel && aluguel.contrato || {};
        const inquilino = contrato.inquilino || {};
        const imovel = contrato.imovel || {};
        const valorPago = this.getCurrencyValue(aluguel.valorPago);
        return `<html>
            <h3 style="float: right">Nº${aluguel.sequencia}</h3>
            <h1>Recibo ${isParcial ? 'parcial ' : ''}de Aluguel</h1>
            <p>Recebemos de <b>${inquilino.nome}</b></p>
            <p>Na data de <b>${moment(aluguel.dataPagamento).format('DD/MM/YYYY')}</b></p>
            <p>A quantia de <b>${valorPago.e} (R$ ${valorPago.v})</b></p>
            ${isParcial ? this.templateParcial(aluguel) : ''}
            <p>Referente ao aluguel de <b>${imovel.descricao.toLowerCase()}</b></p>
            <p>Sito à <b>${imovel.endereco}</b></p>
            <p>Correspondente ao periodo de <b>${isParcial ? 'parcial' : '1 mês'}</b></p>
            <p>Vencido em <b>${moment(aluguel.vencimento).format('DD/MM/YYYY')}</b></p>
            <p><b>${this.config.nomeEmitente}</b></p>
            <h4>Autenticação: ${aluguel.id}</h4>
            </html>`;
    }

    private templateParcial(aluguel: Aluguel): string {
        const contrato = aluguel && aluguel.contrato || {};
        const debito = aluguel.valor - aluguel.valorPago;
        const valorDeb = !!debito && this.getCurrencyValue(debito);
        const valorTotal = this.getCurrencyValue(contrato.valor);
        return `<p>Como pagamento parcial do aluguel com valor de <b>${valorTotal.e} (R$ ${valorTotal.v})</b></p>
            ${!!debito ? `<p>Ficando pendente a quantia de <b>${valorDeb.e} (R$ ${valorDeb.v})</b></p>` : ''}
            ${!!debito ? `<p>A ser pago quanto breve possível</p>` : ''}
            ${!debito ? `<p>Quitando o valor pendente do referido mês de vencimento</p>` : ''}`;
    }

    private getCurrencyValue(value: string | number): { v: string; e: string } {
        const v = Number(value).toFixed(2).replace(/\./g, ',');
        const e = extenso(v, { mode: 'currency' });
        return {
            v,
            e,
        };
    }

    private reciboName(aluguel: Aluguel, isParcial: boolean): string {
        const parcial = isParcial ? 'parcial' : '';
        const data = moment().format('DD-MM-YYYY');
        const nome = aluguel.contrato.inquilino.nome.split(' ')[0].toLowerCase();
        const casa = aluguel.contrato.imovel.nome.replace(/\s+/g, '').toLowerCase();
        return `recibo${aluguel.sequencia}${parcial}-${nome}-${casa}-${data}.pdf`;
    }

    private async gerarRecibo(fileName: string, html: string): Promise<boolean> {
        const options = {
            documentSize: 'A5',
            type: 'base64',
            fileName,
        };
        await this.pdfGenerator.fromData(html, options)
            .then((base64) => this.savebase64AsPDF(options.fileName, base64))
            .then(() => this.share(options.fileName))
            .catch((err) => console.log(err));
        return;
    }

    private async share(fileName: string) {
        const file = this.folderPath + fileName;
        return await this.socialSharing.share('RECIBO', null, file, null);
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

    private savebase64AsPDF(fileName: string, content: string): Promise<void> {
        return this.file.writeFile(
            this.folderPath,
            fileName,
            this.b64toBlob(content, this.contentType),
            { replace: true }
        );
    }

    private async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}
