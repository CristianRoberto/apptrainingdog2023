import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tabs4Page } from './tabs4.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tabs4PageRoutingModule } from './tabs4-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tabs4PageRoutingModule
  ],
  declarations: [Tabs4Page]
})
export class Tabs4PageModule {}
