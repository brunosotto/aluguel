import { SeletorContratoModalPage } from './seletor-contrato/seletor-contrato-modal/seletor-contrato-modal.page';
import { SeletorContratoComponent } from './seletor-contrato/seletor-contrato.component';
import { AluguelModalPage } from './aluguel-modal/aluguel-modal.page';
import { InputMoneyModule } from '../input-money/input-money.module';
import { AluguelPageRoutingModule } from './aluguel-routing.module';
import { QuitarModalPage } from './quitar-modal/quitar-modal.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AluguelPage } from './aluguel.page';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AluguelPageRoutingModule,
    Nl2BrPipeModule,
    InputMoneyModule,
  ],
  entryComponents: [
    QuitarModalPage,
    AluguelModalPage,
    SeletorContratoModalPage,
  ],
  declarations: [
    AluguelPage,
    QuitarModalPage,
    AluguelModalPage,
    SeletorContratoComponent,
    SeletorContratoModalPage,
  ]
})
export class AluguelPageModule {}
