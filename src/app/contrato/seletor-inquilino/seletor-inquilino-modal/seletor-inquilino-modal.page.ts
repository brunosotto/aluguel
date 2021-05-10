import { InquilinoService } from '../../../api/inquilino.service';
import { Inquilino } from '../../../../model/inquilino.model';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-seletor-inquilino-modal',
    templateUrl: 'seletor-inquilino-modal.page.html',
    styleUrls: ['seletor-inquilino-modal.page.scss']
})
export class SeletorInquilinoModalPage implements OnInit {

    @Input()
    private inquilino: Inquilino;

    public imoveis: Inquilino[];

    public form: FormGroup;

    constructor(
        private modalController: ModalController,
        private service: InquilinoService,
        private fb: FormBuilder,
    ) {
        this.load();
    }

    ngOnInit() {
        this.buildForm();
    }

    public selecionar(): void {
        const id = this.form.get('id').value;
        const inquilino = this.imoveis.find(i => i.id === id);
        this.modalController.dismiss(inquilino);
    }

    public cancelar(): void {
        this.modalController.dismiss();
    }

    public limpar(): void {
        this.modalController.dismiss(false);
    }

    private async load(): Promise<void> {
        this.imoveis = (await this.service.listar())
            .filter(v => !v.obsoleto)
            .sort((a, b) => {
                if (a.nome < b.nome) { return -1; }
                if (a.nome > b.nome) { return 1; }
                return 0;
            });
    }

    private buildForm(): void {
        const inquilino = this.inquilino || {};
        this.form = this.fb.group({
            id: [inquilino.id || null],
        });
    }

}
