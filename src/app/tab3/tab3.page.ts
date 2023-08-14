import { Component, OnInit } from '@angular/core';
import { ToastController,LoadingController } from '@ionic/angular';
import {UserService} from '../servicios/user.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit {
 
  products:any=[];
  auxproducts=[];
  searchedUser: any;
  elementos:any = {
    tipob: "",
    bus:''
     };

  constructor(
    public toast: ToastController,
    private servicio: UserService,
    public loadingController: LoadingController,
    ) {}
  

    ngOnInit(): void {
    }
    
    ionViewDidEnter() {
      this.search();
        }

  // Variable para controlar el estado de la actualización
  isRefreshing: boolean = false; 
  handleRefresh(event: any ): void {
  if (this.isRefreshing) {
  return;
}
this.isRefreshing = true; // Marca la actualización como en curso
 this.search(); // Realiza la búsqueda de datos
// // Simula una carga de datos con un retardo de 2 segundos
setTimeout(() => {
this.isRefreshing = false; // Marca la actualización como completada
// // Realiza cualquier otra acción necesaria
// // Reinicia la variable isRefreshing para futuras actualizaciones
this.isRefreshing = false;
}, 2000);
}

  async search(): Promise<void>{
    this.handleRefresh(event);
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
      this.presentToast("Error de conexion");
    })
  }
  onInput2(){
    this.elementos.bus='';
    this.products=this.auxproducts;
  }

  onInput(even:any){
    let val = even.target.value
    if(this.elementos.tipob){
      if(val && val !=''){
        this.products =this.auxproducts.filter((item:any): boolean |any=>{ 
                   if(this.elementos.tipob=='color'){
            return(item.color.toLowerCase().indexOf(val.toLowerCase()) >-1)
          }else if(this.elementos.tipob=='nombreraza'){
            return(item.nombreraza.toLowerCase().indexOf(val.toLowerCase()) >-1)
          }else if(this.elementos.tipob=='sexo'){
            return(item.sexo.toLowerCase().indexOf(val.toLowerCase()) >-1)
        
          }
          //return(item.precio.toLowerCase().indexOf(val.toLowerCase()) >-1)
        })
  
      }else{
      this.products=this.auxproducts;
      }
    }else{
     this.presentToast('Seleccione un criterio de busqueda');
    }
    

  }

  async presentToast(message:any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }}
