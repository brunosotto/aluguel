import { ReciboConfigModalPage } from './recibo-config-modal/recibo-config-modal.page';
import { ConfigurarPageRoutingModule } from './configurar-routing.module';
import { RestoreModalPage } from './retore-modal/restore-modal.page';
import { BackupModalPage } from './backup-modal/backup-modal.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurarPage } from './configurar.page';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ConfigurarPage }]),
    ConfigurarPageRoutingModule,
  ],
  entryComponents: [
    BackupModalPage,
    RestoreModalPage,
    ReciboConfigModalPage,
  ],
  declarations: [
    ConfigurarPage,
    BackupModalPage,
    RestoreModalPage,
    ReciboConfigModalPage,
  ]
})
export class ConfigurarPageModule {}
