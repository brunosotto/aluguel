import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-restore-modal',
    templateUrl: 'restore-modal.page.html',
    styleUrls: ['restore-modal.page.scss']
})
export class RestoreModalPage implements OnInit, OnDestroy {

    public form: FormGroup;

    private destroy$: Subject<void> = new Subject();

    private file: File;

    constructor(
        private modalController: ModalController,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.buildForm();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public restaurar(): void {
        const reader = new FileReader();
        reader.readAsText(this.file);
        reader.onload = (ev) => {
            console.log(reader.result);
        };
    }

    public cancelar(): void {
        this.modalController.dismiss();
    }

    public changeListener(event: EventFile): void {
        this.file = event.target.files[0];
    }

    private buildForm(): void {
        this.form = this.fb.group({
            arquivo: [null],
        });
    }

}

export interface EventFile extends Event {
    target: EventTargetFile;
}

export interface EventTargetFile extends EventTarget {
    files: FileList;
}
