import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Inquilino } from '../../../model/inquilino.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inquilino-modal',
  templateUrl: 'inquilino-modal.page.html',
  styleUrls: ['inquilino-modal.page.scss']
})
export class InquilinoModalPage implements OnInit, OnDestroy {

  @Input()
  private inquilino: Inquilino;

  public form: FormGroup;

  private destroy$: Subject<void> = new Subject();


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

  public salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.modalController.dismiss(this.form.value as Inquilino);
  }

  public cancelar(): void {
    this.modalController.dismiss();
  }

  private buildForm(): void {
    const inquilino = this.inquilino || {};
    this.form = this.fb.group({
      id: [inquilino.id || null],
      nome: [inquilino.nome || null, Validators.required],
      telefone: [inquilino.telefone || null, Validators.required],
      cpf: [inquilino.cpf || null],
      emprego: [inquilino.emprego || null],
      obs: [inquilino.obs || null],
      obsoleto: [inquilino.obsoleto || false],
    });
  }

}
