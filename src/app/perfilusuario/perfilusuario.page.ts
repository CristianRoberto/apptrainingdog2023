import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import {StorageService} from '../storage.service'
import { PopoverController } from '@ionic/angular';
import { EditarperfilusuarioComponent } from '../components/editarperfilusuario/editarperfilusuario.component';
import { isEmpty } from 'lodash';
import {UserService} from '../servicios/user.service';
import { ToastController,LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
})
export class PerfilusuarioPage  implements OnInit {
  
  perfil:any=[];

  products:any=[];
  auxproducts=[];

  public user:any=[];
  perfi: any;

  constructor(private RestService:RestService, 
    public popover: PopoverController,
    public toast: ToastController, 
    public loadingController: LoadingController,
    private servicio: UserService,
    private storage:StorageService) {}
  
    async  ngOnInit()  {
      this.user = window.localStorage.getItem('datos');
    this.user=(JSON.parse(this.user));
    this.user.token = this.user.token;
    this.user.nombre = this.user.nombre.toString().toUpperCase();
    this.user.apellidos = this.user.apellidos.toString().toUpperCase();
    this.user.direccion = this.user.direccion.toString().toUpperCase();
    
    

  }


  ionViewDidEnter(){
    this.search();
  }


  handleRefresh(event:any) {
    this.search();
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };


  async search(): Promise<void>{
    const loading = await this.loadingController.create({ message: 'Cargando...' });
      await loading.present();
    this.servicio.getAdopcionesById({ idcedula: this.user.cedula }).then ( async (re:any)=>{
      this.products=[]
      this.auxproducts=[]
      this.products=re;
      this.auxproducts=this.products;
      await loading.dismiss();
    }).catch(async(e)=>{
      await loading.dismiss();
      this.presentToast("Error de conexion con el Servidor");
    })

    this.servicio.getUsuariosById(this.user.token).then(async (re: any) => {     
      // Modificar la dirección en mayúsculas
  
      this.perfil = [];
      this.auxproducts = [];
      this.perfil = re;
      this.auxproducts = this.perfil;
      await loading.dismiss();
      
    }).catch(async (e) => {
      await loading.dismiss();
      this.presentToast("Error de conexión con el Servidor");
    })
  

 



  } async presentToast(message:any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  
  
  }
  //botonComponenteIrLogin
  async editarperfil(){
    const alert = await this.popover.create({
      component: EditarperfilusuarioComponent,
      mode:'ios',
      cssClass: 'pop-over-style1',
      });
    return await alert.present()
       }


}