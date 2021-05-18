import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { Caixa } from '../../../model/caixa.model';
import { ModalController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
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
    this.modalController.dismiss(this.form.value as Caixa);
  }

  public cancelar(): void {
    this.modalController.dismiss();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [null],
      tipoLancamento: [null],
      data: [moment().toISOString()],
      valor: [null],
      descricao: [null],
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
