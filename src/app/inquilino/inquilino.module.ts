import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InquilinoPage } from './inquilino.page';
import { InquilinoPageRoutingModule } from './inquilino-routing.module';
import { InquilinoModalPage } from './inquilino-modal/inquilino-modal.page';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { IonicMaskDirective } from '../ionic-mask.directive';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: InquilinoPage }]),
    NgxMaskModule.forRoot(),
    InquilinoPageRoutingModule,
    Nl2BrPipeModule,
  ],
  entryComponents: [
    InquilinoModalPage
  ],
  declarations: [
    InquilinoModalPage,
    InquilinoPage,
    IonicMaskDirective,
  ]
})
export class InquilinoPageModule {}
