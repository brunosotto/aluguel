import { InputMoneyModule } from '../input-money/input-money.module';
import { FiltroModalPage } from './filtro-modal/filtro-modal.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaixaPageRoutingModule } from './caixa-routing.module';
import { CaixaModalPage } from './caixa-modal/caixa-modal.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { NgModule } from '@angular/core';
import { CaixaPage } from './caixa.page';

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
    FiltroModalPage,
    CaixaModalPage,
  ],
  declarations: [
    FiltroModalPage,
    CaixaModalPage,
    CaixaPage
  ],
})
export class CaixaPageModule {}
