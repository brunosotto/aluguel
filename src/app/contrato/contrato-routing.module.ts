import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratoPage } from './contrato.page';

const routes: Routes = [
  {
    path: '',
    component: ContratoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratoPageRoutingModule {}
