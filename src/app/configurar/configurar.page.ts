import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { InquilinoService } from '../api/inquilino.service';
import { ContratoService } from '../api/contrato.service';
import { AluguelService } from '../api/aluguel.service';
import { ImovelService } from '../api/imovel.service';
import { CaixaService } from '../api/caixa.service';
import { OverlayEventDetail } from '@ionic/core';
import { Component } from '@angular/core';
import { RestoreModalPage } from './retore-modal/restore-modal.page';

@Component({
    selector: 'app-configurar',
    templateUrl: 'configurar.page.html',
    styleUrls: ['configurar.page.scss']
})
export class ConfigurarPage {

    constructor(
        private inquilinoService: InquilinoService,
        private alertController: AlertController,
        private toastController: ToastController,
        private contratoService: ContratoService,
        private modalController: ModalController,
        private aluguelService: AluguelService,
        private imovelService: ImovelService,
        private caixaService: CaixaService,
    ) { }

    public async limparBanco() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirma a limpeza e remoção de todos os dados?',
            message: 'Isso é irreversível!',
            animated: true,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Limpar',
                    handler: () => {
                        this.clearAll();
                    }
                }
            ]
        });

        await alert.present();
    }

    public backup(): void {
        console.log('backup');
    }

    public restore(): void {
        this.presentModalRestore().then(ret => {
            console.log('após restore::', ret);
        });
    }

    // TODO: trocar o any
    private async presentModalRestore(): Promise<OverlayEventDetail<any>> {
        const modal = await this.modalController.create({
            component: RestoreModalPage,
            cssClass: 'my-custom-class',
            componentProps: { }
        });
        modal.present();
        return modal.onWillDismiss<any>();
    }

    private clearAll(): void {
        this.aluguelService.clear().then(() => {
            this.presentToast('Aluguel limpo');
            this.caixaService.clear().then(() => {
                this.presentToast('Caixa limpo');
                this.contratoService.clear().then(() => {
                    this.presentToast('Contrato limpo');
                    this.imovelService.clear().then(() => {
                        this.presentToast('Imóvel limpo');
                        this.inquilinoService.clear().then(() => {
                            this.presentToast('Inquilino limpo');
                            this.presentToast('Concluído');
                        });
                    });
                });
            });
        });
    }

    private async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}
