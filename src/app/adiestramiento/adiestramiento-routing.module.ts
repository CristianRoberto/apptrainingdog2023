import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdiestramientoPage } from './adiestramiento.page';

const routes: Routes = [
  {
    path: '',
    component: AdiestramientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdiestramientoPageRoutingModule {}
