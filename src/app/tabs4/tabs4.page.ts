import { Component, OnInit } from '@angular/core';
import { ToastController,LoadingController } from '@ionic/angular';
import {UserService} from '../servicios/user.service';

@Component({
  selector: 'app-tabs4',
  templateUrl: 'tabs4.page.html',
  styleUrls: ['tabs4.page.scss']
})
export class Tabs4Page implements OnInit {
  
  public user:any=[];
  products:any=[];
  auxproducts=[];






  constructor(
    public toast: ToastController,
    private servicio:UserService,
    public loadingController: LoadingController,
 

  ) {}



ngOnInit(){
  this.user = window.localStorage.getItem('datos');
this.user=(JSON.parse(this.user));
this.user.nombre = this.user.nombre.toString().toUpperCase();
this.user.apellidos = this.user.apellidos.toString().toUpperCase();

}


    //configuracion de Slider
    slideOptsTwo=
    {
      slidesPerView: 3.5,
    };



    ionViewDidEnter(){
      this.search();
    }


      // Variable para controlar el estado de la actualización
  isRefreshing: boolean = false; 



  handleRefresh(event: any): void {
    if (!event || !event.detail) {
      return;
    }
  
    if (this.isRefreshing) {
      return;
    }
    this.isRefreshing = true; // Marca la actualización como en curso
    this.search().then(() => {
      // Realiza cualquier otra acción necesaria
      // Reinicia la variable isRefreshing para futuras actualizaciones
      this.isRefreshing = false;
      event.detail.complete(); // Marca la actualización como completada
    }).catch(() => {
      // En caso de error, también se debe restablecer isRefreshing
      this.isRefreshing = false;
      event.detail.complete();
    });
  }

    //realiza la busqueda en la base de datos llama al servicio
    async search(): Promise<void>{
      const loading = await this.loadingController.create({ message: 'Cargando...' });
        await loading.present();
      this.servicio.getMascotas().then ( async (re:any)=>{
        this.products=[]
        this.auxproducts=[]
        this.products=re;
        this.auxproducts=this.products;
        await loading.dismiss();
      }).catch(async(e)=>{
        await loading.dismiss();
        this.presentToast("Error de conexion con el Servidor");
      })
    }




    async presentToast(message:any) {
      const toast = await this.toast.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }




}