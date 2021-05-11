import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Aluguel } from '../../../model/aluguel.model';
import { ModalController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-aluguel-modal',
    templateUrl: 'aluguel-modal.page.html',
    styleUrls: ['aluguel-modal.page.scss']
})
export class AluguelModalPage implements OnInit, OnDestroy {

    public form: FormGroup;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private modalController: ModalController,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.buildForm();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public salvar(): void {
        this.modalController.dismiss(this.form.value as Aluguel);
    }

    public cancelar(): void {
        this.modalController.dismiss();
    }

    private buildForm(): void {
        this.form = this.fb.group({
            gerar: [null],
            contrato: [null],
            competencia: [null],
        });

        this.listenGerar();
    }

    private listenGerar(): void {
        this.form.get('gerar').valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(_ => this.form.get('contrato').setValue(null));
    }

}
