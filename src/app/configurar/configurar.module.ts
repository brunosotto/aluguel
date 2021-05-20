import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigurarPage } from './configurar.page';
import { ConfigurarPageRoutingModule } from './configurar-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ConfigurarPage }]),
    ConfigurarPageRoutingModule,
  ],
  declarations: [ConfigurarPage]
})
export class ConfigurarPageModule {}
