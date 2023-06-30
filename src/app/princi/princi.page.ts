import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { PopoverlogiComponent } from '../components/popoverlogi/popoverlogi.component';
import { PopoverregistroComponent } from '../components/popoverregistro/popoverregistro.component';
import { UserService } from '../servicios/user.service';
import { StorageService } from '../storage.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-princi',
  templateUrl: './princi.page.html',
  styleUrls: ['./princi.page.scss'],
})
export class PrinciPage implements OnInit {

  //formulario:FormGroup;
  mensaje: string = "";
  token: string = "";
  logueado: Boolean = false;


  products: any = [];
  auxproducts = [];

  slideOptsTwo = {
    initialSlide: 0,
    speed: 500,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      stopOnLastSlide: true // agregado para detener el desplazamiento en la última diapositiva
    },
    slidesPerView: 1,
    autoHeight: true
  };




  constructor(private form: FormBuilder,
    public popover: PopoverController,
    public toast: ToastController,
    private servicio: UserService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private storage: StorageService) { }

  ngOnInit(): void {
    // if(this.storage.getCurrentUser()){
    //window.location.href="/tabs";
  }


  ionViewDidEnter() {
    this.search();
  }


  //realiza la busqueda en la base de datos llama al servicio   
  async search(): Promise<void> {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();
    this.servicio.getMascotas().then(async (re: any) => {
      this.products = []
      this.auxproducts = []
      this.products = re;
      this.auxproducts = this.products;
      await loading.dismiss();
      this.presentToast("Conectado Con el Servidor");
    }).catch(async (e) => {
      await loading.dismiss();
      this.presentToast("Error de conexion con el Servidor");
    })
  }

  handleRefresh(event: any) {
    this.search();
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  async presentToast(message: any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async Ingresarlogin() {
    const alert = await this.alertController.create({
      header: 'Error, Iniciar Seccion ',
      message: 'Para Realizar una adopcion canina debe iniciar seccion con su usuario o registrarse.',
    });
    await alert.present();

  }
  //botonComponenteIrLogin
  //botonComponenteIrLogin
  async login() {
    const alert = await this.popover.create({
      component: PopoverlogiComponent,
      mode: 'ios',
      cssClass: 'pop-over-style1',
    });

    alert.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        //this.search();
        // this.presentToast("Modificado con correctamente")

        if (dataReturned.data.cont == 0) {
          this.regstro()
        } else if (dataReturned.data.cont == 1) {
          console.log(dataReturned.data);
          // this.fot=dataReturned.data.data.foto;
          //this.logue=dataReturned.data.data.name;
          //this.blo=1;
          // localStorage.setItem('foto',dataReturned.data.data.foto);
          //localStorage.setItem('name',dataReturned.data.data.name);
          //localStorage.setItem('login','true');
          //  this.salir=true;
        }
      }
    });
    return await alert.present()

  }
  //botonComponenteIrRegistro  
  async regstro() {
    const alert2 = await this.popover.create({
      component: PopoverregistroComponent,
      mode: 'ios',
      cssClass: 'pop-over-style2',
    });

    alert2.onDidDismiss().then((dataReturned) => {

      if (dataReturned.data) {
        //this.search();
        // this.presentToast("Modificado con correctamente")
        if (dataReturned.data.cont == 1) {
          this.login()
        }
      }
    });
    return await alert2.present()
  }
}