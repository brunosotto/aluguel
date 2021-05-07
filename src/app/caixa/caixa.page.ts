
import { lancamentosMock } from '../../mock/caixa.mock';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { Caixa } from '../../model/caixa.model';
import { Component } from '@angular/core';

@Component({
    selector: 'app-caixa',
    templateUrl: 'caixa.page.html',
    styleUrls: ['caixa.page.scss']
})
export class CaixaPage {

    public lancamentos: Caixa[] = lancamentosMock;

    public expanded: string;

    constructor(
        public modalController: ModalController,
    ) { }

    public expandItem(id: string): void {
        this.expanded = this.expanded !== id ? id : null;
    }

    public cancelar(lancamento: Caixa): void {
        console.log('cancelar: ', lancamento);

        this.presentModal();
    }

    private async presentModal(): Promise<OverlayEventDetail<boolean>> {
        const modal = await this.modalController.create({
            component: CaixaPage,
            cssClass: 'my-custom-class'
        });
        modal.present();
        return modal.onWillDismiss<boolean>();
    }

}
