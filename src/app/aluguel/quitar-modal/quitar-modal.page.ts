import { PagamentoType, QuitarAluguel } from '../../../model/quitar-aluguel.model';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Aluguel } from '../../../model/aluguel.model';
import { ModalController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-quitar-modal',
    templateUrl: 'quitar-modal.page.html',
    styleUrls: ['quitar-modal.page.scss']
})
export class QuitarModalPage implements OnInit, OnDestroy {

    @Input()
    private aluguel: Aluguel;

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
        this.modalController.dismiss(this.form.value as QuitarAluguel);
    }

    public cancelar(): void {
        this.modalController.dismiss();
    }

    private buildForm(): void {
        this.form = this.fb.group({
            pagamento: [null],
            valor: [this.aluguel.valor],
            valorPago: [null],
            obs: [null],
        });

        this.listenGerar();
    }

    private listenGerar(): void {
        this.form.get('pagamento').valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((p: PagamentoType) => {
                this.form.get('valorPago').setValue(p === 'T' ? this.aluguel.valor : null);
            });
    }

}
