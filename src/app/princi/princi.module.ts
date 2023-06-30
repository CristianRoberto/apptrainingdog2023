import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrinciPageRoutingModule } from './princi-routing.module';

import { PrinciPage } from './princi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrinciPageRoutingModule
  ],
  declarations: [PrinciPage]
})
export class PrinciPageModule { }
