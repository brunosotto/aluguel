import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrosPage } from './cadastros.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrosPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosPageRoutingModule {}
