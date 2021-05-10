import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Contrato } from '../../../model/contrato.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DatetimeOptions } from '@ionic/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-contrato-modal',
    templateUrl: 'contrato-modal.page.html',
    styleUrls: ['contrato-modal.page.scss']
})
export class ContratoModalPage implements OnInit, OnDestroy {

    @Input()
    private contrato: Contrato;

    public customDayShortNames = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

    public displayFormat = 'DD/MM/YYYY';

    public monthShortNames = 'jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez';

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

    salvar() {
        this.modalController.dismiss(this.form.value as Contrato);
    }

    cancelar() {
        this.modalController.dismiss();
    }

    public getCustomOptions(formControlName: string): DatetimeOptions {
        return {
            buttons: [
                {
                    text: 'Limpar',
                    handler: () => this.form.get(formControlName).setValue(null)
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Aplicar',
                    role: 'done',
                    handler: (ret: RetDatePicker) => {
                        const date = new Date(`${ret.year.text}-${ret.month.text}-${ret.day.text}`);
                        this.form.get(formControlName).setValue(date);
                    }
                },
            ]
        };
    }

    private buildForm(): void {
        const contrato = this.contrato || {};
        this.form = this.fb.group({
            id: [contrato.id || null],
            imovel: [contrato.imovel || null, Validators.required],
            imovelId: [contrato.imovelId || null, Validators.required],
            inquilino: [contrato.inquilino || null, Validators.required],
            inquilinoId: [contrato.inquilinoId || null, Validators.required],
            valor: [contrato.valor || null, Validators.required],
            dataInicio: [contrato.dataInicio || null, Validators.required],
            dataEncerramento: [contrato.dataEncerramento || null],
            diaVencimento: [contrato.diaVencimento || null, [Validators.required, Validators.min(1), Validators.max(31)]],
            antecipado: [contrato.antecipado || null],
            obs: [contrato.obs || null],
            obsoleto: [contrato.obsoleto || false],
        });
    }

}

interface RetDatePicker {
    day: RetDatePickerEl;
    month: RetDatePickerEl;
    year: RetDatePickerEl;
}

interface RetDatePickerEl {
    columnIndex: number;
    text: string;
    value: number;
}
