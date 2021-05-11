import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AluguelPage } from './aluguel.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AluguelPageRoutingModule } from './aluguel-routing.module';
import { AluguelModalPage } from './aluguel-modal/aluguel-modal.page';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { SeletorContratoComponent } from './seletor-contrato/seletor-contrato.component';
import { SeletorContratoModalPage } from './seletor-contrato/seletor-contrato-modal/seletor-contrato-modal.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    AluguelPageRoutingModule,
    Nl2BrPipeModule,
  ],
  entryComponents: [
    AluguelModalPage,
    SeletorContratoModalPage,
  ],
  declarations: [
    AluguelPage,
    AluguelModalPage,
    SeletorContratoComponent,
    SeletorContratoModalPage,
  ]
})
export class AluguelPageModule {}
