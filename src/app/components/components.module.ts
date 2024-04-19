import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { PopoverlogiComponent } from './popoverlogi/popoverlogi.component';
import { PopoverregistroComponent } from './popoverregistro/popoverregistro.component';
import { EditarperfilusuarioComponent } from './editarperfilusuario/editarperfilusuario.component';
import { RegistroadopcionComponent } from './registroadopcion/registroadopcion.component';
import { DogDetailsModalComponent } from './dog-details-modal/dog-details-modal.component';




@NgModule({
  declarations: [
    PopoverlogiComponent,
    PopoverregistroComponent,
    //IngresomascotaComponent,
    EditarperfilusuarioComponent,
    RegistroadopcionComponent,
    DogDetailsModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    PopoverlogiComponent,
    PopoverregistroComponent,
    EditarperfilusuarioComponent,
    DogDetailsModalComponent,
    RegistroadopcionComponent
  ],
})
export class ComponentsModule { }
