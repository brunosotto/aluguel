import { AluguelModalPage, GenerateAluguelInput } from './aluguel-modal/aluguel-modal.page';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { QuitarModalPage } from './quitar-modal/quitar-modal.page';
import { Aluguel, AluguelStatus } from '../../model/aluguel.model';
import { QuitarAluguel } from '../../model/quitar-aluguel.model';
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
        private toastController: ToastController,
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
                        if (!motivo) { return; }
                        aluguel.motivoCancelamento = motivo;
                        aluguel.status = 'C';
                        this.update(aluguel, 'Cancelado');
                    }
                }
            ]
        });

        await alert.present();
    }

    public restaurar(aluguel: Aluguel): void {
        aluguel.motivoCancelamento = null;
        aluguel.status = 'D';
        this.update(aluguel, 'Restaurado');
    }

    public quitar(aluguel: Aluguel): void {
        this.presentModalQuitar(aluguel).then(ret => {
            this.quitarAluguel(aluguel, ret.data);
        });
    }

    public reemitir(aluguel: Aluguel): void {
        this.aluguelPageService.reemitir(aluguel);
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

    public isParcial(a: Aluguel): boolean {
        return a.isParcial || (!!a.valorPago && a.valorPago < a.valor);
    }

    private quitarAluguel(aluguel: Aluguel, quitar: QuitarAluguel): void {
        if (!quitar) { return; }
        this.aluguelPageService
            .quitarAluguel(aluguel, quitar)
            .then(() => {
                this.load();
            });
    }

    private generateAluguel(input: GenerateAluguelInput): void {
        if (!input) { return; }
        this.aluguelPageService
            .generateAluguel(input)
            .then(() => {
                this.presentToast('Gerado com sucesso!');
                this.load();
            });
    }

    private update(aluguel: Aluguel, msg?: string): void {
        if (!aluguel) { return; }
        this.service
            .alterar(aluguel)
            .then(() => {
                this.presentToast(`${msg || 'Salvo'} com sucesso!`);
                this.load();
            });
    }

    private async load(): Promise<void> {
        this.alugueis = (await this.service.listar())
            .filter(v => v.status === this.filter)
            .sort((a, b) => {
                if (this.filter === 'D' || this.filter === 'C') {
                    if (a.vencimento < b.vencimento) { return -1; }
                    if (a.vencimento > b.vencimento) { return 1; }
                }
                if (this.filter === 'Q') {
                    if (a.dataPagamento < b.dataPagamento) { return 1; }
                    if (a.dataPagamento > b.dataPagamento) { return -1; }
                }
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

    private async presentModalQuitar(aluguel: Aluguel): Promise<OverlayEventDetail<QuitarAluguel>> {
        const modal = await this.modalController.create({
            component: QuitarModalPage,
            cssClass: 'my-custom-class',
            componentProps: { aluguel }
        });
        modal.present();
        return modal.onWillDismiss<Aluguel>();
    }

    private async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}
