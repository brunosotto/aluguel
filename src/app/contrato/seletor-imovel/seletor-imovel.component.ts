import { SeletorImovelModalPage } from './seletor-imovel-modal/seletor-imovel-modal.page';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { Imovel } from 'src/model/imovel.model';
import { FormControl } from '@angular/forms';
import { merge, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-seletor-imovel',
    templateUrl: 'seletor-imovel.component.html',
    styleUrls: ['seletor-imovel.component.scss']
})
export class SeletorImovelComponent implements OnInit, OnDestroy {

    @Input()
    private imovelControl: FormControl;

    @Input()
    private imovelIdControl: FormControl;

    public imovelViewControl: FormControl = new FormControl(null);

    private destroy$: Subject<void> = new Subject();

    constructor(
        private modalController: ModalController,
    ) {
    }

    ngOnInit() {
        this.listenImovel();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public seleciona(): void {
        const imovel = this.imovelControl.value as Imovel;
        this.presentModal(imovel).then(res => {
            if (res.data) {
                this.imovelControl.setValue(res.data);
            }

            if (res.data === false) {
                this.imovelControl.setValue(res.data);
            }
        });
    }

    private listenImovel() {
        merge(
            of(this.imovelControl.value),
            this.imovelControl.valueChanges
        )
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(imovel => {
                this.imovelIdControl.setValue(imovel && imovel.id || null);
                this.imovelViewControl.setValue(imovel && imovel.nome || null);
            });
    }

    private async presentModal(imovel?: Imovel): Promise<OverlayEventDetail<Imovel>> {
        const modal = await this.modalController.create({
            component: SeletorImovelModalPage,
            cssClass: 'my-custom-class',
            componentProps: { imovel }
        });
        modal.present();
        return modal.onWillDismiss<Imovel>();
    }

}
