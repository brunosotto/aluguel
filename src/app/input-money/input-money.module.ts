import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMoneyComponent } from './input-money.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InputMoneyComponent,
  ],
  exports: [
    InputMoneyComponent,
  ]
})
export class InputMoneyModule {}
