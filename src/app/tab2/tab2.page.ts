import { Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../servicios/user.service';
import { ToastController,LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  products: any[] = [];

  @ViewChild(IonContent) content: IonContent | any;
  auxproducts: any[] = [];
  searchedUser: any;
  public characters:any = [];
  
  elementos:any = {
    tipob: "",
    bus:''
     };
  toastController: any;
  constructor(
    public toast: ToastController,
    public loadingController: LoadingController,
    private servicio: UserService,
    private http: HttpClient
    ) {}
  
    slideOptsTwo=
    {
      slidesPerView: 3.1,
    };  

    
  scrollToBottom() {
    this.content.scrollToBottom(300); // El número 300 representa la duración de la animación en milisegundos.
  }

  ngOnInit(): void {
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
    this.servicio.getAdiestramientos().then ( async (re:any)=>{
      this.products=[];
      this.auxproducts=[];
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
                     if(this.elementos.tipob=='id'){
              return(item.id.toLowerCase().indexOf(val.toLowerCase()) >-1)
            }else if(this.elementos.tipob=='titulo'){
              return(item.titulo.toLowerCase().indexOf(val.toLowerCase()) >-1)
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
    }
  
  
  }