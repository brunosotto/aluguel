import { SeletorInquilinoModalPage } from './seletor-inquilino-modal/seletor-inquilino-modal.page';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { Inquilino } from 'src/model/inquilino.model';
import { FormControl } from '@angular/forms';
import { merge, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-seletor-inquilino',
    templateUrl: 'seletor-inquilino.component.html',
    styleUrls: ['seletor-inquilino.component.scss']
})
export class SeletorInquilinoComponent implements OnInit, OnDestroy {

    @Input()
    public inquilinoControl: FormControl;

    @Input()
    public inquilinoIdControl: FormControl;

    public inquilinoViewControl: FormControl = new FormControl(null);

    private destroy$: Subject<void> = new Subject();

    constructor(
        private modalController: ModalController,
    ) {
    }

    ngOnInit() {
        this.listenInquilino();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public seleciona(): void {
        const inquilino = this.inquilinoControl.value as Inquilino;
        this.presentModal(inquilino).then(res => {
            if (res.data) {
                this.inquilinoControl.setValue(res.data);
            }

            if (res.data === false) {
                this.inquilinoControl.setValue(res.data);
            }
        });
    }

    private listenInquilino() {
        merge(
            of(this.inquilinoControl.value),
            this.inquilinoControl.valueChanges
        )
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(inquilino => {
                this.inquilinoIdControl.setValue(inquilino && inquilino.id || null);
                this.inquilinoViewControl.setValue(inquilino && inquilino.nome || null);
            });
    }

    private async presentModal(inquilino?: Inquilino): Promise<OverlayEventDetail<Inquilino>> {
        const modal = await this.modalController.create({
            component: SeletorInquilinoModalPage,
            cssClass: 'my-custom-class',
            componentProps: { inquilino }
        });
        modal.present();
        return modal.onWillDismiss<Inquilino>();
    }

}
