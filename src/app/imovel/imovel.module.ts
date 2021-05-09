import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImovelPage } from './imovel.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ImovelPageRoutingModule } from './imovel-routing.module';
import { ImovelModalPage } from './imovel-modal/imovel-modal.page';
import { Nl2BrPipeModule } from 'nl2br-pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ImovelPage }]),
    ImovelPageRoutingModule,
    Nl2BrPipeModule,
  ],
  entryComponents: [
    ImovelModalPage
  ],
  declarations: [
    ImovelModalPage,
    ImovelPage,
  ]
})
export class ImovelPageModule {}
