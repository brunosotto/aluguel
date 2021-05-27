
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FiltroModalPage } from './filtro-modal/filtro-modal.page';
import { CaixaModalPage } from './caixa-modal/caixa-modal.page';
import { CaixaFiltro } from 'src/model/caixa-filtro.model';
import { CaixaService } from '../api/caixa.service';
import { OverlayEventDetail } from '@ionic/core';
import { Caixa } from '../../model/caixa.model';
import { Component } from '@angular/core';
import moment from 'moment';

@Component({
    selector: 'app-caixa',
    templateUrl: 'caixa.page.html',
    styleUrls: ['caixa.page.scss']
})
export class CaixaPage {

    public lancamentos: Caixa[];

    public expanded: string;

    public filter: CaixaFiltro;

    public totais: CaixaTotal;

    constructor(
        private modalController: ModalController,
        private alertController: AlertController,
        private toastController: ToastController,
        private service: CaixaService,
    ) {
    }

    ionViewDidEnter() {
        this.load();
    }

    public expandItem(id: string): void {
        this.expanded = this.expanded !== id ? id : null;
    }

    public async cancelar(lancamento: Caixa) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Informe o motivo!',
            inputs: [
                {
                    name: 'motivo',
                    type: 'textarea',
                    placeholder: 'Motivo'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Ok',
                    handler: ({ motivo }: { motivo: string }) => {
                        if (!motivo) { return; }
                        lancamento.motivoCancelamento = motivo;
                        lancamento.cancelado = true;
                        this.update(lancamento, 'Cancelado');
                    }
                }
            ]
        });

        await alert.present();
    }

    public restaurar(lancamento: Caixa): void {
        lancamento.motivoCancelamento = null;
        lancamento.cancelado = false;
        this.update(lancamento, 'Restaurado');
    }

    public novo(): void {
        this.presentModal().then(ret => {
            this.update(ret.data);
        });
    }

    public filtrar(): void {
        this.presentModalFiltro().then(ret => {
            this.filter = ret.data;
            this.load();
        });
    }

    public removerFiltro(): void {
        this.filter = null;
        this.load();
    }

    private update(lancamento: Caixa, msg?: string): void {
        if (!lancamento) { return; }
        (
            !!lancamento.id ?
                this.service.alterar(lancamento) :
                this.service.inserir(lancamento)
        ).then(() => {
            this.presentToast(`${msg || 'Salvo'} com sucesso!`);
            this.load();
        });
    }

    private async load(): Promise<void> {
        this.lancamentos = (await this.service.listar()).reverse();

        if (this.filter) {
            const dataInicio = moment(this.filter.dataInicio).startOf('day');
            const dataFim = moment(this.filter.dataFim).endOf('day');
            this.lancamentos = this.lancamentos
                .filter(l => moment(l.data).isBetween(dataInicio, dataFim));
            this.calcTotal();
        }
    }

    private calcTotal(): void {
        const creditos = this.lancamentos
            .filter(l => l.tipoLancamento === 'C')
            .reduce((a, c) => a + c.valor, 0);

        const debitos = this.lancamentos
            .filter(l => l.tipoLancamento === 'D')
            .reduce((a, c) => a + c.valor, 0);

        const consumo = this.lancamentos
            .filter(l => l.tipoLancamento === 'D' && l.contaDeConsumo)
            .reduce((a, c) => a + c.valor, 0);

        this.totais = {
            creditos,
            debitos,
            consumo
        };
    }

    private async presentModal(): Promise<OverlayEventDetail<Caixa>> {
        const modal = await this.modalController.create({
            component: CaixaModalPage,
            cssClass: 'my-custom-class'
        });
        modal.present();
        return modal.onWillDismiss<Caixa>();
    }

    private async presentModalFiltro(): Promise<OverlayEventDetail<CaixaFiltro>> {
        const modal = await this.modalController.create({
            component: FiltroModalPage,
            cssClass: 'my-custom-class'
        });
        modal.present();
        return modal.onWillDismiss<CaixaFiltro>();
    }

    private async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}

interface CaixaTotal {
    creditos: number;
    debitos: number;
    consumo: number;
}
