import { ReciboConfigService } from '../../api/recibo-config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReciboConfig } from '../../../model/recibo-config.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-recibo-config-modal',
    templateUrl: 'recibo-config-modal.page.html',
    styleUrls: ['recibo-config-modal.page.scss']
})
export class ReciboConfigModalPage implements OnInit, OnDestroy {

    public form: FormGroup;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private modalController: ModalController,
        private toastController: ToastController,
        private service: ReciboConfigService,
        private fb: FormBuilder,
    ) {
        this.buildForm();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public async salvar(): Promise<void> {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        await this.service.manter(this.form.value as ReciboConfig);
        this.presentToast('Salvo com sucesso!');
        this.modalController.dismiss();
    }

    public cancelar(): void {
        this.modalController.dismiss();
    }

    private async buildForm(): Promise<void> {
        const current = await this.service.obter();
        this.form = this.fb.group({
            nomeEmitente: [current.nomeEmitente || null, Validators.required],
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

export interface EventFile extends Event {
    target: EventTargetFile;
}

export interface EventTargetFile extends EventTarget {
    files: FileList;
}

type Resolver = (value: boolean | PromiseLike<boolean>) => void;
