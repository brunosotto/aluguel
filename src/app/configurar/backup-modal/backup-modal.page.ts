import { ModalController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { File } from '@ionic-native/file/ngx';
import { TABELAS } from '../constants';
import { Subject } from 'rxjs';
import moment from 'moment';

@Component({
    selector: 'app-backup-modal',
    templateUrl: 'backup-modal.page.html',
    styleUrls: ['backup-modal.page.scss']
})
export class BackupModalPage implements OnInit, OnDestroy {

    private store: Storage | null = null;

    private destroy$: Subject<void> = new Subject();

    private readonly folderPath = this.file.cacheDirectory;

    constructor(
        private modalController: ModalController,
        private toastController: ToastController,
        private socialSharing: SocialSharing,
        private storage: Storage,
        private file: File,
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public async backup(): Promise<void> {
        const fileName = this.fileName();
        const data = await this.data();
        this.file.writeFile(this.folderPath, fileName, data, { replace: true })
            .then(_ => this.share(fileName))
            .then(_ => this.complete())
            .catch((err) => console.log(err));
    }

    public cancelar(): void {
        this.modalController.dismiss();
    }

    private complete(): void {
        this.presentToast('Backup efetuado!');
        this.modalController.dismiss();
    }

    private async init(): Promise<boolean> {
        this.store = await this.storage.create();
        return true;
    }

    private async share(fileName: string) {
        const file = this.folderPath + fileName;
        return await this.socialSharing.share('BACKUP', null, file, null);
    }

    private fileName(): string {
        const data = moment().format('DD-MM-YYYY');
        return `backup-aluguel-${data}.json`;
    }

    private async data(): Promise<string> {
        const dados = new Promise<string>(resolve => {
            this.generateEachData(Object.values(TABELAS), {}, resolve);
        });
        return await dados;
    }

    private generateEachData(tables: string[], backup: any, resolve: Resolver) {
        if (!!tables.length) {
            const table = tables.pop();
            this.readTable(table).then(result => {
                backup[table] = result;
                this.generateEachData(tables, backup, resolve);
            });
            return;
        }
        resolve(JSON.stringify(backup));
    }

    private async readTable(table: string): Promise<any> {
        if (!this.store) {
            await this.init();
        }

        return await this.store.get(table) || [];
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

type Resolver = (value: string | PromiseLike<string>) => void;
