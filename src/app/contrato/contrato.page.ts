import { ContratoModalPage } from './contrato-modal/contrato-modal.page';
import { AlertController, ModalController } from '@ionic/angular';
import { ContratoService } from '../api/contrato.service';
import { Contrato } from '../../model/contrato.model';
import { OverlayEventDetail } from '@ionic/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-contrato',
    templateUrl: 'contrato.page.html',
    styleUrls: ['contrato.page.scss']
})
export class ContratoPage {

    public contratos: Contrato[];

    public expanded: string;

    public filter: 'I' | 'A' = 'A';

    constructor(
        private modalController: ModalController,
        private alertController: AlertController,
        private service: ContratoService,
    ) {
        this.load();
    }

    public expandItem(id: string): void {
        this.expanded = this.expanded !== id ? id : null;
    }

    public async excluir(contrato: Contrato) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirma a exclusão?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Sim',
                    handler: () => {
                        contrato.obsoleto = true;
                        this.update(contrato);
                    }
                }
            ]
        });

        await alert.present();
    }

    public alterar(contrato: Contrato): void {
        this.presentModal(contrato).then(ret => {
            this.update(ret.data);
        });
    }

    public novo(): void {
        this.presentModal().then(ret => {
            this.update(ret.data);
        });
    }

    public setFilter(val: 'I' | 'A') {
        this.filter = val;
        this.load();
    }

    private update(contrato: Contrato): void {
        if (!contrato) { return; }
        (
            !!contrato.id ?
                this.service.alterar(contrato) :
                this.service.inserir(contrato)
        ).then(() => {
            this.load();
        });
    }

    private filterAtivo(v: Contrato): boolean {
        return (!v.dataEncerramento && this.filter === 'A') ||
            (!!v.dataEncerramento && this.filter === 'I');
    }

    private async load(): Promise<void> {
        this.contratos = (await this.service.listar())
            .filter(v => !v.obsoleto)
            .filter(v => this.filterAtivo(v))
            .sort((a, b) => {
                if (a.imovel.nome < b.imovel.nome) { return -1; }
                if (a.imovel.nome > b.imovel.nome) { return 1; }
                return 0;
            });
    }

    private async presentModal(contrato?: Contrato): Promise<OverlayEventDetail<Contrato>> {
        const modal = await this.modalController.create({
            component: ContratoModalPage,
            cssClass: 'my-custom-class',
            componentProps: { contrato }
        });
        modal.present();
        return modal.onWillDismiss<Contrato>();
    }

}
