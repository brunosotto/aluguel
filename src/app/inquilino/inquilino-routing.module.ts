import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquilinoPage } from './inquilino.page';

const routes: Routes = [
  {
    path: '',
    component: InquilinoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquilinoPageRoutingModule {}
