import { ContratoService } from '../../../api/contrato.service';
import { Contrato } from '../../../../model/contrato.model';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-seletor-contrato-modal',
    templateUrl: 'seletor-contrato-modal.page.html',
    styleUrls: ['seletor-contrato-modal.page.scss']
})
export class SeletorContratoModalPage implements OnInit {

    @Input()
    private contrato: Contrato;

    public contratos: Contrato[];

    public form: FormGroup;

    constructor(
        private modalController: ModalController,
        private service: ContratoService,
        private fb: FormBuilder,
    ) {
        this.load();
    }

    ngOnInit() {
        this.buildForm();
    }

    public selecionar(): void {
        const id = this.form.get('id').value;
        const contrato = this.contratos.find(i => i.id === id);
        this.modalController.dismiss(contrato);
    }

    public cancelar(): void {
        this.modalController.dismiss();
    }

    public limpar(): void {
        this.modalController.dismiss(false);
    }

    private async load(): Promise<void> {
        this.contratos = (await this.service.listar())
            .filter(v => !v.obsoleto)
            .filter(v => !v.dataEncerramento)
            .sort((a, b) => {
                if (a.imovel.nome < b.imovel.nome) { return -1; }
                if (a.imovel.nome > b.imovel.nome) { return 1; }
                return 0;
            });
    }

    private buildForm(): void {
        const contrato = this.contrato || {};
        this.form = this.fb.group({
            id: [contrato.id || null],
        });
    }

}
