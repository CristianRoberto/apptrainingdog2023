import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalVacunasPage } from './modal-vacunas.page';

const routes: Routes = [
  {
    path: '',
    component: ModalVacunasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalVacunasPageRoutingModule {}
