import { Component, OnInit } from '@angular/core';

import { AlertController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverlogiComponent } from 'src/app/components/popoverlogi/popoverlogi.component';
import { PopoverregistroComponent } from 'src/app/components/popoverregistro/popoverregistro.component';
//import {StorageService} from './storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  esAdministrador: boolean = false;
  navigate!: { title: string; url: string; icon: string; }[];

  ROLES = {
    USUARIO: 'usuario',
    ADMINISTRADOR: 'administrador'
  };


  ngOnInit() {
    this.verificarRol();
  }

  verificarRol() {
    // Obtener el valor almacenado en Local Storage
    const datosString = localStorage.getItem('datos');
    if (datosString) {
      const datos = JSON.parse(datosString);
      console.log(datos);

      // Verificar el rol y establecer el valor de esAdministrador
      if (datos.rol === this.ROLES.ADMINISTRADOR) {
        this.esAdministrador = true;
      } else {
        this.esAdministrador = false;
      }
    } else {
      this.esAdministrador = false;
    }

    // Construir el menú lateral
    this.sideMenu();
  }


  sideMenu() {
    this.navigate = [];

    if (this.esAdministrador) {
      this.navigate.push({
        title: "Perfil Administrador",
        url: "/perfiladmin",
        icon: "logo-reddit"
      });
    } else {
      this.navigate.push({
        title: "Inicio Usuario",
        url: "/tabs/tabs/tab4",
        icon: "home-outline"
      }, {
        title: "Mi Perfil Usuario",
        url: "/perfilusuario",
        icon: "man-outline"
      });
    }
  }





  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    //private storage:StorageService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public popover: PopoverController
  ) {
    // this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // ngOnInit() {
  // //mira en el local store al ejecutar esta pantalla tabs
  // //si no encuentra datos en store te redirigue a la pantalla principál.
  // // if(this.storage.getCurrentUser()){
  // //   window.location.href="/tabs";
  // }






  async salir() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Salir',
      message: '¿Deberitas te quieres salir?',
      buttons: [
        {
          text: 'No mejor no',
          cssClass: 'custom-button adopt-button',
          handler: () => {
          }
        }, {
          text: 'Sii',
          cssClass: 'custom-button salir-button',
          handler: () => {
            localStorage.clear();
            this.navCtrl.navigateRoot('princi');
          }
        }
      ]
    });

    await alert.present();
  }
}