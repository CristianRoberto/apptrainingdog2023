import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrinciPage } from './princi.page';

const routes: Routes = [
  {
    path: '',
    component: PrinciPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrinciPageRoutingModule {}
