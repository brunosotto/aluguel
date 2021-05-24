import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Subject } from 'rxjs';
import moment from 'moment';

@Component({
    selector: 'app-backup-modal',
    templateUrl: 'backup-modal.page.html',
    styleUrls: ['backup-modal.page.scss']
})
export class BackupModalPage implements OnInit, OnDestroy {

    private destroy$: Subject<void> = new Subject();
    private readonly folderPath = this.file.cacheDirectory;

    constructor(
        private modalController: ModalController,
        private socialSharing: SocialSharing,
        private file: File,
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public backup(): void {
        const fileName = this.fileName();
        this.file.writeFile(this.folderPath, fileName, this.data(), { replace: true })
            .then(_ => this.share(fileName))
            .catch((err) => console.log(err));
    }

    public cancelar(): void {
        this.modalController.dismiss();
    }

    private async share(fileName: string) {
        const file = this.folderPath + fileName;
        return await this.socialSharing.share('BACKUP', null, file, null);
    }

    private fileName(): string {
        const data = moment().format('DD-MM-YYYY');
        return `backup-aluguel-${data}.json`;
    }

    private data(): string {
        const test = {
            testando: 123,
            novo: 1234,
        };
        return JSON.stringify(test);
    }

}

export interface EventFile extends Event {
    target: EventTargetFile;
}

export interface EventTargetFile extends EventTarget {
    files: FileList;
}
