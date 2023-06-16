import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdopcionesPage } from './adopciones.page';

const routes: Routes = [
  {
    path: '',
    component: AdopcionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdopcionesPageRoutingModule {}
