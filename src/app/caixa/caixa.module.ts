import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaixaPage } from './caixa.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CaixaPageRoutingModule } from './caixa-routing.module';
import { Nl2BrPipeModule } from 'nl2br-pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CaixaPageRoutingModule,
    Nl2BrPipeModule,
  ],
  declarations: [CaixaPage]
})
export class CaixaPageModule {}
