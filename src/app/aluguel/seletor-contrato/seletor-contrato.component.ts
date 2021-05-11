import { SeletorContratoModalPage } from './seletor-contrato-modal/seletor-contrato-modal.page';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { Contrato } from 'src/model/contrato.model';
import { FormControl } from '@angular/forms';
import { merge, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-seletor-contrato',
    templateUrl: 'seletor-contrato.component.html',
    styleUrls: ['seletor-contrato.component.scss']
})
export class SeletorContratoComponent implements OnInit, OnDestroy {

    @Input()
    private contratoControl: FormControl;

    @Input()
    private contratoIdControl: FormControl;

    public contratoViewControl: FormControl = new FormControl(null);

    private destroy$: Subject<void> = new Subject();

    constructor(
        private modalController: ModalController,
    ) {
    }

    ngOnInit() {
        this.listenContrato();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public seleciona(): void {
        const contrato = this.contratoControl.value as Contrato;
        this.presentModal(contrato).then(res => {
            if (res.data) {
                this.contratoControl.setValue(res.data);
            }

            if (res.data === false) {
                this.contratoControl.setValue(res.data);
            }
        });
    }

    private listenContrato() {
        merge(
            of(this.contratoControl.value),
            this.contratoControl.valueChanges
        )
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(contrato => {
                this.contratoIdControl.setValue(contrato && contrato.id || null);
                this.contratoViewControl.setValue(contrato && (`${contrato.imovel.nome} - ${contrato.inquilino.nome}`) || null);
            });
    }

    private async presentModal(contrato?: Contrato): Promise<OverlayEventDetail<Contrato>> {
        const modal = await this.modalController.create({
            component: SeletorContratoModalPage,
            cssClass: 'my-custom-class',
            componentProps: { contrato }
        });
        modal.present();
        return modal.onWillDismiss<Contrato>();
    }

}
