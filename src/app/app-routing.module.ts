import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    //'tabs/tabs/tab1'
    redirectTo: 'princi',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'princi',
    loadChildren: () => import('./princi/princi.module').then( m => m.PrinciPageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
 
  {
    path: 'perfilusuario',
    loadChildren: () => import('./perfilusuario/perfilusuario.module').then( m => m.PerfilusuarioPageModule)
  },
  {
    path: 'perfiladmin',
    loadChildren: () => import('./perfiladmin/perfiladmin.module').then( m => m.PerfiladminPageModule)
  },
  {
    path: 'perfiladmin',
    loadChildren: () => import('./perfiladmin/perfiladmin.module').then( m => m.PerfiladminPageModule)
  },
  {
    path: 'perfiladmin',
    loadChildren: () => import('./perfiladmin/perfiladmin.module').then( m => m.PerfiladminPageModule)
  },  {
    path: 'modal-vacunas',
    loadChildren: () => import('./modal-vacunas/modal-vacunas.module').then( m => m.ModalVacunasPageModule)
  },

  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
