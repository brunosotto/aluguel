import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaixaFiltro } from '../../../model/caixa-filtro.model';
import { Component, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filtro-modal',
  templateUrl: 'filtro-modal.page.html',
  styleUrls: ['filtro-modal.page.scss']
})
export class FiltroModalPage implements OnDestroy {

  public form: FormGroup;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public aplicar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.modalController.dismiss(this.form.value as CaixaFiltro);
  }

  public cancelar(): void {
    this.modalController.dismiss();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
    });
  }

}
