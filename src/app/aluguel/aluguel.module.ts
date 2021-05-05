import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AluguelPage } from './aluguel.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AluguelPageRoutingModule } from './aluguel-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AluguelPageRoutingModule
  ],
  declarations: [AluguelPage]
})
export class AluguelPageModule {}
