import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurarPage } from './configurar.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurarPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurarPageRoutingModule {}
