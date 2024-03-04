import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalVacunasPageRoutingModule } from './modal-vacunas-routing.module';

import { ModalVacunasPage } from './modal-vacunas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalVacunasPageRoutingModule
  ],
  declarations: [ModalVacunasPage]
})
export class ModalVacunasPageModule {}
