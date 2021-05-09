import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImovelPage } from './imovel.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ImovelPageRoutingModule } from './imovel-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ImovelPage }]),
    ImovelPageRoutingModule,
  ],
  declarations: [ImovelPage]
})
export class ImovelPageModule {}
