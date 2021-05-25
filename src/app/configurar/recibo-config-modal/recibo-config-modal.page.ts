import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReciboConfig } from '../../../model/recibo-config.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

    public async salvar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.modalController.dismiss(this.form.value as ReciboConfig);
    }

    public cancelar(): void {
        this.modalController.dismiss();
    }

    private buildForm(): void {
        this.form = this.fb.group({
            nomeEmitente: [null, Validators.required],
        });
    }

}

export interface EventFile extends Event {
    target: EventTargetFile;
}

export interface EventTargetFile extends EventTarget {
    files: FileList;
}

type Resolver = (value: boolean | PromiseLike<boolean>) => void;
