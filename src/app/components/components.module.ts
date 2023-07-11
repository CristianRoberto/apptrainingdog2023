import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { PopoverlogiComponent } from './popoverlogi/popoverlogi.component';
import { PopoverregistroComponent } from './popoverregistro/popoverregistro.component';
//import { IngresomascotaComponent } from './ingresomascota/ingresomascota.component';
import { EditarperfilusuarioComponent } from './editarperfilusuario/editarperfilusuario.component';
import { RegistroadopcionComponent } from './registroadopcion/registroadopcion.component';



@NgModule({
  declarations: [
    PopoverlogiComponent,
    PopoverregistroComponent,
    //IngresomascotaComponent,
    EditarperfilusuarioComponent,
    RegistroadopcionComponent
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
    //IngresomascotaComponent,
    RegistroadopcionComponent
  ],
})
export class ComponentsModule { }
