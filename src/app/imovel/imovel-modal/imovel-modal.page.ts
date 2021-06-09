import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Imovel } from '../../../model/imovel.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-imovel-modal',
  templateUrl: 'imovel-modal.page.html',
  styleUrls: ['imovel-modal.page.scss']
})
export class ImovelModalPage implements OnInit, OnDestroy {

  @Input()
  public imovel: Imovel;

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

    this.modalController.dismiss(this.form.value as Imovel);
  }

  public cancelar(): void {
    this.modalController.dismiss();
  }

  private buildForm(): void {
    const imovel = this.imovel || {};
    this.form = this.fb.group({
      id: [imovel.id || null],
      nome: [imovel.nome || null, Validators.required],
      endereco: [imovel.endereco || null, Validators.required],
      descricao: [imovel.descricao || null, Validators.required],
      obs: [imovel.obs || null],
      obsoleto: [imovel.obsoleto || false],
    });
  }

}
