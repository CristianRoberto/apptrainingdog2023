// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { IonicModule } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';
// import { TabsPage } from './tabs.page';
// import { TabsPageRoutingModule } from './tabs-routing.module';
// import { StorageService } from '../storage.service';

// @NgModule({
//   imports: [
//     IonicModule,
//     CommonModule,
//     FormsModule,
//     TabsPageRoutingModule
//   ],
//   declarations: [TabsPage], // Asegúrate de que TabsPage tenga el decorador @Component aplicado
//   providers: [StorageService],
//   exports: [
//     TabsPage
//   ]
// })
// export class TabsPageModule {}




import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}