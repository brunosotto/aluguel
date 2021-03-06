import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Contrato } from '../../../model/contrato.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DatetimeOptions } from '@ionic/core';
import moment from 'moment';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-contrato-modal',
    templateUrl: 'contrato-modal.page.html',
    styleUrls: ['contrato-modal.page.scss']
})
export class ContratoModalPage implements OnInit, OnDestroy {

    @Input()
    public contrato: Contrato;

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

    public salvar(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.modalController.dismiss(this.form.value as Contrato);
    }

    public cancelar(): void {
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
                        const text = `${ret.year.text}-${ret.month.text}-${ret.day.text}`;
                        const date = moment(text).toISOString();
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
            valor: [contrato.valor || null, [Validators.required, Validators.min(0.01)]],
            dataInicio: [contrato.dataInicio || null, Validators.required],
            dataEncerramento: [contrato.dataEncerramento || null],
            diaVencimento: [contrato.diaVencimento || null, [Validators.required, Validators.min(1), Validators.max(31)]],
            sequencia: [contrato.sequencia || 1, [Validators.required, Validators.min(1)]],
            antecipado: [contrato.antecipado || null],
            obs: [contrato.obs || null],
            obsoleto: [contrato.obsoleto || false],
        });
    }

    public get inquilinoControl(): FormControl {
        return this.form.get('inquilino') as FormControl;
    }

    public get inquilinoIdControl(): FormControl {
        return this.form.get('inquilinoId') as FormControl;
    }

    public get imovelControl(): FormControl {
        return this.form.get('imovel') as FormControl;
    }

    public get imovelIdControl(): FormControl {
        return this.form.get('imovelId') as FormControl;
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
