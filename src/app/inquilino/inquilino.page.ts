import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { InquilinoModalPage } from './inquilino-modal/inquilino-modal.page';
import { InquilinoService } from '../api/inquilino.service';
import { Inquilino } from '../../model/inquilino.model';
import { OverlayEventDetail } from '@ionic/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-inquilino',
    templateUrl: 'inquilino.page.html',
    styleUrls: ['inquilino.page.scss']
})
export class InquilinoPage {

    public inquilinos: Inquilino[];

    public expanded: string;

    constructor(
        private modalController: ModalController,
        private alertController: AlertController,
        private toastController: ToastController,
        private service: InquilinoService,
    ) {
    }

    ionViewDidEnter() {
        this.load();
    }

    public expandItem(id: string): void {
        this.expanded = this.expanded !== id ? id : null;
    }

    public async excluir(inquilino: Inquilino) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirma a exclusão?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Sim',
                    handler: () => {
                        inquilino.obsoleto = true;
                        this.update(inquilino, 'Excluído');
                    }
                }
            ]
        });

        await alert.present();
    }

    public alterar(inquilino: Inquilino): void {
        this.presentModal(inquilino).then(ret => {
            this.update(ret.data);
        });
    }

    public novo(): void {
        this.presentModal().then(ret => {
            this.update(ret.data);
        });
    }

    private update(inquilino: Inquilino, msg?: string): void {
        if (!inquilino) { return; }
        (
            !!inquilino.id ?
                this.service.alterar(inquilino) :
                this.service.inserir(inquilino)
        ).then(() => {
            this.presentToast(`${msg || 'Salvo'} com sucesso!`);
            this.load();
        });
    }

    private async load(): Promise<void> {
        this.inquilinos = (await this.service.listar())
            .filter(v => !v.obsoleto)
            .sort((a, b) => {
                if (a.nome < b.nome) { return -1; }
                if (a.nome > b.nome) { return 1; }
                return 0;
            });
    }

    private async presentModal(inquilino?: Inquilino): Promise<OverlayEventDetail<Inquilino>> {
        const modal = await this.modalController.create({
            component: InquilinoModalPage,
            cssClass: 'my-custom-class',
            componentProps: { inquilino }
        });
        modal.present();
        return modal.onWillDismiss<Inquilino>();
    }

    private async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}
