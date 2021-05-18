import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { QuitarAluguel } from '../../model/quitar-aluguel.model';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { Aluguel } from '../../model/aluguel.model';
import { File } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class ReciboService {

    private readonly contentType = 'application/pdf';
    private readonly folderPath = this.file.cacheDirectory;

    constructor(
        private socialSharing: SocialSharing,
        private file: File,
        private pdfGenerator: PDFGenerator,
    ) {
    }

    public async gerar(aluguel: Aluguel, quitar: QuitarAluguel): Promise<boolean> {
        const contrato = aluguel && aluguel.contrato || {};
        const inquilino = contrato.inquilino || {};
        const imovel = contrato.imovel || {};
        const html = `<html><h1>Recibo de aluguel</h1><h2>${inquilino.nome} - ${imovel.nome}</h2></html>`;
        const fileName = this.reciboName(aluguel, quitar);
        return await this.gerarRecibo(fileName, html);
    }

    private reciboName(aluguel: Aluguel, quitar: QuitarAluguel): string {
        const isParcial = quitar.valorPago < quitar.valor;
        const parcial = isParcial ? 'parcial' : '';
        const data = moment().format('DD-MM-YYYY');
        const nome = aluguel.contrato.inquilino.nome.split(' ')[0].toLowerCase();
        const casa = aluguel.contrato.imovel.nome.replace(/\s+/g, '').toLowerCase();
        return `recibo${aluguel.sequencia}${parcial}-${nome}-${casa}-${data}.pdf`;
    }

    private async gerarRecibo(fileName: string, html: string): Promise<boolean> {
        const options = {
            documentSize: 'A4',
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

}
