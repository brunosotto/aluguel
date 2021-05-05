import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'aluguel',
        loadChildren: () => import('../aluguel/aluguel.module').then(m => m.AluguelPageModule)
      },
      {
        path: 'caixa',
        loadChildren: () => import('../caixa/caixa.module').then(m => m.CaixaPageModule)
      },
      {
        path: 'contrato',
        loadChildren: () => import('../contrato/contrato.module').then(m => m.ContratoPageModule)
      },
      {
        path: 'configurar',
        loadChildren: () => import('../configurar/configurar.module').then(m => m.ConfigurarPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/aluguel',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/aluguel',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
