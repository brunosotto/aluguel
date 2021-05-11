import { AluguelModalPage } from './aluguel-modal/aluguel-modal.page';
import { AlertController, ModalController } from '@ionic/angular';
import { AluguelService } from '../api/aluguel.service';
import { Aluguel, AluguelStatus } from '../../model/aluguel.model';
import { OverlayEventDetail } from '@ionic/core';
import { Component } from '@angular/core';
@Component({
    selector: 'app-aluguel',
    templateUrl: 'aluguel.page.html',
    styleUrls: ['aluguel.page.scss']
})
export class AluguelPage {

    public alugueis: Aluguel[];

    public expanded: string;

    public filter: AluguelStatus = 'D';

    constructor(
        private modalController: ModalController,
        private alertController: AlertController,
        private service: AluguelService,
    ) {
        this.load();
    }

    public expandItem(id: string): void {
        this.expanded = this.expanded !== id ? id : null;
    }

    public async cancelar(aluguel: Aluguel) {
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
                        aluguel.status = 'C';
                        this.update(aluguel);
                    }
                }
            ]
        });

        await alert.present();
    }

    public novo(): void {
        this.presentModal().then(ret => {
            this.update(ret.data);
        });
    }

    public setFilter(val: AluguelStatus) {
        this.filter = val;
        this.load();
    }

    private update(aluguel: Aluguel): void {
        (
            !!aluguel.id ?
                this.service.alterar(aluguel) :
                this.service.inserir(aluguel)
        ).then(() => {
            this.load();
        });
    }

    private async load(): Promise<void> {
        this.alugueis = (await this.service.listar())
            .filter(v => v.status === this.filter)
            .sort((a, b) => {
                if (a.vencimento < b.vencimento) { return -1; }
                if (a.vencimento > b.vencimento) { return 1; }
                return 0;
            });
    }

    private async presentModal(): Promise<OverlayEventDetail<Aluguel>> {
        const modal = await this.modalController.create({
            component: AluguelModalPage,
            cssClass: 'my-custom-class'
        });
        modal.present();
        return modal.onWillDismiss<Aluguel>();
    }

}
