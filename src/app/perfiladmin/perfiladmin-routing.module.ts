import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfiladminPage } from './perfiladmin.page';
const routes: Routes = [
  {
    path: 'tabs',
    component: PerfiladminPage, 
    children: [
      {
        path: 'usuarios',
        loadChildren: () => import('../usuarios/usuarios.module').then( m => m.UsuariosPageModule)
      },
      {
        path: 'mascotas',
        loadChildren: () => import('../mascotas/mascotas.module').then( m => m.MascotasPageModule)
      },
      {
        path: 'adiestramiento',
        loadChildren: () => import('../adiestramiento/adiestramiento.module').then( m => m.AdiestramientoPageModule)
      },
      
      {
        path: 'adopciones',
        loadChildren: () => import('../adopciones/adopciones.module').then( m => m.AdopcionesPageModule)
      }

    ]
  },
  {
    path: '',
    redirectTo: 'tabs/usuarios',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfiladminPageRoutingModule {}
