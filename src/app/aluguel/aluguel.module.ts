import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AluguelPage } from './aluguel.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AluguelPageRoutingModule } from './aluguel-routing.module';
import { AluguelModalPage } from './aluguel-modal/aluguel-modal.page';
import { Nl2BrPipeModule } from 'nl2br-pipe';

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
  ],
  declarations: [
    AluguelPage,
    AluguelModalPage,
  ]
})
export class AluguelPageModule {}
