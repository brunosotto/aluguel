import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ImovelModalPage } from './imovel-modal/imovel-modal.page';
import { ImovelService } from '../api/imovel.service';
import { Imovel } from '../../model/imovel.model';
import { OverlayEventDetail } from '@ionic/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-imovel',
    templateUrl: 'imovel.page.html',
    styleUrls: ['imovel.page.scss']
})
export class ImovelPage {

    public imoveis: Imovel[];

    public expanded: string;

    constructor(
        private modalController: ModalController,
        private alertController: AlertController,
        private toastController: ToastController,
        private service: ImovelService,
    ) {
        this.load();
    }

    public expandItem(id: string): void {
        this.expanded = this.expanded !== id ? id : null;
    }

    public async excluir(imovel: Imovel) {
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
                        imovel.obsoleto = true;
                        this.update(imovel, 'Excluído');
                    }
                }
            ]
        });

        await alert.present();
    }

    public alterar(imovel: Imovel): void {
        this.presentModal(imovel).then(ret => {
            this.update(ret.data);
        });
    }

    public novo(): void {
        this.presentModal().then(ret => {
            this.update(ret.data);
        });
    }

    private update(imovel: Imovel, msg?: string): void {
        if (!imovel) { return; }
        (
            !!imovel.id ?
                this.service.alterar(imovel) :
                this.service.inserir(imovel)
        ).then(() => {
            this.presentToast(`${msg || 'Salvo'} com sucesso!`);
            this.load();
        });
    }

    private async load(): Promise<void> {
        this.imoveis = (await this.service.listar())
            .filter(v => !v.obsoleto)
            .sort((a, b) => {
                if (a.nome < b.nome) { return -1; }
                if (a.nome > b.nome) { return 1; }
                return 0;
            });
    }

    private async presentModal(imovel?: Imovel): Promise<OverlayEventDetail<Imovel>> {
        const modal = await this.modalController.create({
            component: ImovelModalPage,
            cssClass: 'my-custom-class',
            componentProps: { imovel }
        });
        modal.present();
        return modal.onWillDismiss<Imovel>();
    }

    private async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}
