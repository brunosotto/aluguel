import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Caixa } from '../../../model/caixa.model';

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

  salvar() {
    this.modalController.dismiss(this.form.value as Caixa);
  }

  cancelar() {
    this.modalController.dismiss();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [null],
      tipoLancamento: [null],
      data: [new Date()],
      valor: [null],
      descricao: [null],
      aluguel: [null],
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
