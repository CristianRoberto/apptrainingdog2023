import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdopcionesPageRoutingModule } from './adopciones-routing.module';

import { AdopcionesPage } from './adopciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdopcionesPageRoutingModule
  ],
  declarations: [AdopcionesPage]
})
export class AdopcionesPageModule {}
