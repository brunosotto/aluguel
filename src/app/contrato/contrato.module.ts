import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContratoPage } from './contrato.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ContratoPageRoutingModule } from './contrato-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ContratoPage }]),
    ContratoPageRoutingModule,
  ],
  declarations: [ContratoPage]
})
export class ContratoPageModule {}
