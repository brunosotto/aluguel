import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContratoPage } from './contrato.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ContratoPageRoutingModule } from './contrato-routing.module';
import { ContratoModalPage } from './contrato-modal/contrato-modal.page';
import { SeletorImovelComponent } from './seletor-imovel/seletor-imovel.component';
import { SeletorImovelModalPage } from './seletor-imovel/seletor-imovel-modal/seletor-imovel-modal.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ContratoPage }]),
    ContratoPageRoutingModule,
  ],
  entryComponents: [
    ContratoModalPage,
    SeletorImovelModalPage,
  ],
  declarations: [
    ContratoPage,
    ContratoModalPage,
    SeletorImovelComponent,
    SeletorImovelModalPage,
  ]
})
export class ContratoPageModule {}
