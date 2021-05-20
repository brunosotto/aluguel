import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaixaPage } from './caixa.page';
import { CaixaPageRoutingModule } from './caixa-routing.module';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { CaixaModalPage } from './caixa-modal/caixa-modal.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CaixaPageRoutingModule,
    Nl2BrPipeModule,
  ],
  entryComponents: [
    CaixaModalPage
  ],
  declarations: [
    CaixaModalPage,
    CaixaPage
  ],
})
export class CaixaPageModule {}
