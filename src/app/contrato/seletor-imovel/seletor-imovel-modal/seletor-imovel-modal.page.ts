import { ImovelService } from '../../../api/imovel.service';
import { Imovel } from '../../../../model/imovel.model';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-seletor-imovel-modal',
    templateUrl: 'seletor-imovel-modal.page.html',
    styleUrls: ['seletor-imovel-modal.page.scss']
})
export class SeletorImovelModalPage implements OnInit {

    @Input()
    public imovel: Imovel;

    public imoveis: Imovel[];

    public form: FormGroup;

    constructor(
        private modalController: ModalController,
        private service: ImovelService,
        private fb: FormBuilder,
    ) {
        this.load();
    }

    ngOnInit() {
        this.buildForm();
    }

    public selecionar(): void {
        const id = this.form.get('id').value;
        const imovel = this.imoveis.find(i => i.id === id);
        this.modalController.dismiss(imovel);
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
        const imovel = this.imovel || {};
        this.form = this.fb.group({
            id: [imovel.id || null],
        });
    }

}
