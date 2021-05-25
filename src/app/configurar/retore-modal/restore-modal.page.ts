import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TABELAS } from '../constants';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-restore-modal',
    templateUrl: 'restore-modal.page.html',
    styleUrls: ['restore-modal.page.scss']
})
export class RestoreModalPage implements OnInit, OnDestroy {

    private store: Storage | null = null;

    private destroy$: Subject<void> = new Subject();

    private file: File;

    constructor(
        private modalController: ModalController,
        private toastController: ToastController,
        private alertController: AlertController,
        private storage: Storage,
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public async restaurar() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirma a restauração de dados?',
            message: 'Os dados atuais serão sobrescritos!',
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.readFile();
                    }
                }
            ]
        });

        await alert.present();
    }

    public cancelar(): void {
        this.modalController.dismiss();
    }

    public changeListener(event: EventFile): void {
        this.file = event.target.files[0];
    }

    private readFile(): void {
        const reader = new FileReader();
        reader.onload = (_) => {
            this.restore(reader.result as string);
        };
        reader.readAsText(this.file);
    }

    private async init(): Promise<boolean> {
        this.store = await this.storage.create();
        return true;
    }

    private restore(text: string): void {
        try {
            const data = JSON.parse(text);
            this.retoreData(data);
        } catch (error) {
            console.log(error);
            this.presentToast('Falha ao importar arquivo!');
        }
    }

    private async retoreData(data: any): Promise<void> {
        const dados = new Promise<boolean>(resolve => {
            this.retoreEachData(Object.values(TABELAS), data, resolve);
        });
        await dados;
        this.presentToast('Backup restaurado!');
        this.modalController.dismiss();
    }

    private retoreEachData(tables: string[], data: any, resolve: Resolver): void {
        if (!!tables.length) {
            const table = tables.pop();
            this.writeTable(table, data[table]).then(result => {
                this.retoreEachData(tables, data, resolve);
            });
            return;
        }
        resolve(true);
    }

    private async writeTable(table: string, data: any) {
        if (!this.store) {
            await this.init();
        }

        await this.store.set(table, data);
    }

    private async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}

export interface EventFile extends Event {
    target: EventTargetFile;
}

export interface EventTargetFile extends EventTarget {
    files: FileList;
}

type Resolver = (value: boolean | PromiseLike<boolean>) => void;
