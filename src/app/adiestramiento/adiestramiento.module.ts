import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdiestramientoPageRoutingModule } from './adiestramiento-routing.module';

import { AdiestramientoPage } from './adiestramiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdiestramientoPageRoutingModule
  ],
  declarations: [AdiestramientoPage]
})
export class AdiestramientoPageModule {}
