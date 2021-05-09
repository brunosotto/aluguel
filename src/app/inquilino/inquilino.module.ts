import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InquilinoPage } from './inquilino.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { InquilinoPageRoutingModule } from './inquilino-routing.module';
import { InquilinoModalPage } from './inquilino-modal/inquilino-modal.page';
import { Nl2BrPipeModule } from 'nl2br-pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: InquilinoPage }]),
    InquilinoPageRoutingModule,
    Nl2BrPipeModule,
  ],
  entryComponents: [
    InquilinoModalPage
  ],
  declarations: [
    InquilinoModalPage,
    InquilinoPage,
  ]
})
export class InquilinoPageModule {}
