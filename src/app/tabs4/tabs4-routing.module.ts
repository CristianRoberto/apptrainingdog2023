import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tabs4Page } from './tabs4.page';

const routes: Routes = [
  {
    path: '',
    component: Tabs4Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tabs4PageRoutingModule {}
