import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaixaPage } from './caixa.page';
import { CaixaPageRoutingModule } from './caixa-routing.module';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { CaixaModalPage } from './caixa-modal/caixa-modal.page';
import { InputMoneyModule } from '../input-money/input-money.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CaixaPageRoutingModule,
    Nl2BrPipeModule,
    InputMoneyModule,
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
