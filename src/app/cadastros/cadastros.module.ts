import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CadastrosPageRoutingModule } from './cadastros-routing.module';
import { CadastrosPage } from './cadastros.page';
import { RouterModule } from '@angular/router';
import { ContratoPageModule } from '../contrato/contrato.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CadastrosPage }]),
    CadastrosPageRoutingModule,
    ContratoPageModule,
  ],
  declarations: [CadastrosPage]
})
export class CadastrosPageModule {}
