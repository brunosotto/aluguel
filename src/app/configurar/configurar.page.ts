import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { RestoreModalPage } from './retore-modal/restore-modal.page';
import { BackupModalPage } from './backup-modal/backup-modal.page';
import { Storage } from '@ionic/storage-angular';
import { Component } from '@angular/core';
import { TABELAS } from './constants';
import { ReciboConfigModalPage } from './recibo-config-modal/recibo-config-modal.page';

@Component({
    selector: 'app-configurar',
    templateUrl: 'configurar.page.html',
    styleUrls: ['configurar.page.scss']
})
export class ConfigurarPage {

    private store: Storage | null = null;

    constructor(
        private alertController: AlertController,
        private toastController: ToastController,
        private modalController: ModalController,
        private storage: Storage,
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
                        this.clearAll(Object.values(TABELAS));
                    }
                }
            ]
        });

        await alert.present();
    }

    public async backup(): Promise<void> {
        const modal = await this.modalController.create({
            component: BackupModalPage,
            cssClass: 'my-custom-class',
            componentProps: {}
        });
        modal.present();
        modal.onWillDismiss<undefined>().then(ret => {
            this.reload();
        });
    }

    public async restore(): Promise<void> {
        const modal = await this.modalController.create({
            component: RestoreModalPage,
            cssClass: 'my-custom-class',
            componentProps: {}
        });
        modal.present();
        modal.onWillDismiss<undefined>().then(ret => {
            this.reload();
        });
    }

    public async configRecibo(): Promise<void> {
        const modal = await this.modalController.create({
            component: ReciboConfigModalPage,
            cssClass: 'my-custom-class',
            componentProps: {}
        });
        modal.present();
    }

    private async init(): Promise<boolean> {
        this.store = await this.storage.create();
        return true;
    }

    private reload(): void {
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    private clearAll(tables: string[]): void {
        if (!!tables.length) {
            const table = tables.pop();
            this.clearTable(table).then(result => {
                this.clearAll(tables);
            });
            return;
        }

        this.presentToast('Concluído');
        this.reload();
    }

    private async clearTable(table: string) {
        if (!this.store) {
            await this.init();
        }

        await this.store.set(table, null);
    }

    private async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}
