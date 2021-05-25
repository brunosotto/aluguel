import { Component, OnInit, OnDestroy } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-recibo-config-modal',
    templateUrl: 'recibo-config-modal.page.html',
    styleUrls: ['recibo-config-modal.page.scss']
})
export class ReciboConfigModalPage implements OnInit, OnDestroy {

    private destroy$: Subject<void> = new Subject();

    constructor(
        private modalController: ModalController,
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public async salvar() {
    }

    public cancelar(): void {
        this.modalController.dismiss();
    }

}

export interface EventFile extends Event {
    target: EventTargetFile;
}

export interface EventTargetFile extends EventTarget {
    files: FileList;
}

type Resolver = (value: boolean | PromiseLike<boolean>) => void;
