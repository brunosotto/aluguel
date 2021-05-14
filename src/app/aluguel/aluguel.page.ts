import { AluguelModalPage, GenerateAluguelInput } from './aluguel-modal/aluguel-modal.page';
import { QuitarAluguelInput, QuitarModalPage } from './quitar-modal/quitar-modal.page';
import { Aluguel, AluguelStatus } from '../../model/aluguel.model';
import { AlertController, ModalController } from '@ionic/angular';
import { AluguelPageService } from './aluguel.page.service';
import { AluguelService } from '../api/aluguel.service';
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
        private aluguelPageService: AluguelPageService,
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
            header: 'Confirma o cancelamento?',
            inputs: [
                {
                    name: 'motivo',
                    type: 'textarea',
                    placeholder: 'Motivo'
                }
            ],
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Sim',
                    handler: ({ motivo }: { motivo: string }) => {
                        aluguel.motivoCancelamento = motivo;
                        aluguel.status = 'C';
                        this.update(aluguel);
                    }
                }
            ]
        });

        await alert.present();
    }

    public restaurar(aluguel: Aluguel): void {
        aluguel.motivoCancelamento = null;
        aluguel.status = 'D';
        this.update(aluguel);
    }

    public quitar(aluguel: Aluguel): void {
        this.presentModalQuitar(aluguel).then(ret => {
            if (!!ret.data) {
                this.aluguelPageService.quitarAluguel(aluguel, ret.data);
            }
        });
    }

    public novo(): void {
        this.presentModal().then(ret => {
            this.generateAluguel(ret.data);
        });
    }

    public setFilter(val: AluguelStatus) {
        this.filter = val;
        this.load();
    }

    private generateAluguel(input: GenerateAluguelInput): void {
        if (!input) { return; }
        this.aluguelPageService
            .generateAluguel(input)
            .then(() => {
                this.load();
            });
    }

    private update(aluguel: Aluguel): void {
        if (!aluguel) { return; }
        this.service
            .alterar(aluguel)
            .then(() => {
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

    private async presentModalQuitar(aluguel: Aluguel): Promise<OverlayEventDetail<QuitarAluguelInput>> {
        const modal = await this.modalController.create({
            component: QuitarModalPage,
            cssClass: 'my-custom-class',
            componentProps: { aluguel }
        });
        modal.present();
        return modal.onWillDismiss<Aluguel>();
    }

}
