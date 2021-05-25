
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CaixaModalPage } from './caixa-modal/caixa-modal.page';
import { CaixaService } from '../api/caixa.service';
import { OverlayEventDetail } from '@ionic/core';
import { Caixa } from '../../model/caixa.model';
import { Component } from '@angular/core';

@Component({
    selector: 'app-caixa',
    templateUrl: 'caixa.page.html',
    styleUrls: ['caixa.page.scss']
})
export class CaixaPage {

    public lancamentos: Caixa[];

    public expanded: string;

    constructor(
        private modalController: ModalController,
        private alertController: AlertController,
        private toastController: ToastController,
        private service: CaixaService,
    ) {
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
    }

    private async presentModal(): Promise<OverlayEventDetail<Caixa>> {
        const modal = await this.modalController.create({
            component: CaixaModalPage,
            cssClass: 'my-custom-class'
        });
        modal.present();
        return modal.onWillDismiss<Caixa>();
    }

    private async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}
