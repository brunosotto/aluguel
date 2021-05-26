import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { Caixa } from '../../../model/caixa.model';
import { ModalController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-caixa-modal',
  templateUrl: 'caixa-modal.page.html',
  styleUrls: ['caixa-modal.page.scss']
})
export class CaixaModalPage implements OnDestroy {

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

  public salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.modalController.dismiss(this.form.value as Caixa);
  }

  public cancelar(): void {
    this.modalController.dismiss();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [null],
      tipoLancamento: [null, Validators.required],
      data: [moment().toISOString()],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      descricao: [null, Validators.required],
      aluguel: [null],
      aluguelId: [null],
      contaDeConsumo: [false],
      cancelado: [false],
      motivoCancelamento: [null],
    });

    this.listenTipoLancamento();
  }

  private listenTipoLancamento(): void {
    this.form.get('tipoLancamento').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => this.form.get('contaDeConsumo').setValue(false));
  }

}
