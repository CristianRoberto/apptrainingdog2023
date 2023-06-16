import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import {HttpClientModule} from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CargarScriptsService  } from './servicios/cargar-scripts.service';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent],
  imports: [
    ComponentsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
  ],
    providers: [
    SplashScreen,
    CargarScriptsService,
    StatusBar,    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
