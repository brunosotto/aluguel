import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-caixa-modal',
  templateUrl: 'caixa-modal.page.html',
  styleUrls: ['caixa-modal.page.scss']
})
export class CaixaModalPage {

  public form: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  salvar() {
    this.modalController.dismiss();
  }

  cancelar() {
    this.modalController.dismiss();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      valor: [null],
    });
  }

}
