import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController,LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import {UserService} from '../servicios/user.service';
import { PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-adiestramiento',
  templateUrl: './adiestramiento.page.html',
  styleUrls: ['./adiestramiento.page.scss'],
})
export class AdiestramientoPage implements OnInit {
  @ViewChild(IonContent) content: IonContent | any;

  public previsualizacion!: string;
  public archivos: any = []
  products:any=[];
  auxproducts=[];
  searchedUser: any;
  elementos:any = {
    formato: "",
    tipob: "",
    bus:''
     };
  public archivoCargado:any;
  public totalArchivoCargado = 0;
  public tamanioArchivoCargado = 0;
  url: any;
  http: any;
  
  constructor(public popover: PopoverController,
    public toast: ToastController,
    private servicio: UserService,
    private sanitizer: DomSanitizer,
    public loadingController: LoadingController,
    ) {}
  ngOnInit() {
    this.search();
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
                   if(this.elementos.tipob=='cedula'){
            return(item.cedula.toLowerCase().indexOf(val.toLowerCase()) >-1)
          }else if(this.elementos.tipob=='nombre'){
            return(item.nombre.toLowerCase().indexOf(val.toLowerCase()) >-1)
        
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
      this.products=[]
      this.auxproducts=[]
      this.products=re;
      this.auxproducts=this.products;
      await loading.dismiss();
    }).catch(async(_e)=>{
      await loading.dismiss();
      this.presentToast({ args: ["Error de conexion"] });
    })
  }

 
  async exit (){
    this.popover.dismiss(); 


  }

  cargaArchivo2(event: any): any{
    this.archivoCargado = event.target.files[0];
this.archivos.push(this.archivoCargado);
this.extraerBase64(this.archivoCargado).then((imagen: any) => {
  this.previsualizacion = imagen.base;
  console.log(imagen);
  })
}
extraerBase64 = async ($event: any) => new Promise((resolve, _reject): any => {
  try {
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve({
        base: reader.result
      });
    };
    reader.onerror = _error => {
      resolve({
        base: null
      });
    };

  } catch (e) {
    return null;
  }
})
clearImage(): any {
  this.previsualizacion = '';
  this.archivos = [];
}

  cargaArchivo(archivo:any): Promise<void> | any { 
    this.archivoCargado = archivo[0];
    this.totalArchivoCargado =archivo.length;
    this.tamanioArchivoCargado = archivo[0].size/1024;
    let externsion =this.getFileExtension({ filename: this.elementos.formato })
    if(externsion =='JPG' || externsion =='jpg'|| externsion =='PNG'|| externsion =='png' ){

    }else{
      this.archivoCargado =null;
      this.totalArchivoCargado=0;
      this.tamanioArchivoCargado=0;
      this.elementos.formato="";
      return this.presentToast("Solo se aceptan  archivo en formato Png y Jpg");
    }
  }

  getFileExtension({ filename }: { filename: any; }): any {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  async presentToast(message:any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  scrollToBottom() {
    this.content.scrollToBottom(300); // El número 300 representa la duración de la animación en milisegundos.
  }

  
  //Guardar o registar un nuevo usuario
  Guardar(producForm: NgForm){
    console.log(producForm)
    if(producForm.valid){
        let archivo = this.archivoCargado;
        let reader = new FileReader();
        console.log(archivo);
        reader.readAsDataURL(archivo);
        reader.onload = () => {
          let archivoByte:any = reader.result;
          archivoByte = archivoByte.toString();
          producForm.value.foto=archivoByte
           console.log(producForm.value)
            this.servicio.postAdiestramientos(producForm.value).then(async(re:any)=>{
              if(re.false){
                 this.presentToast('Error al guardar')
              }else{
                this.presentToast('Adiestramiento Canino Agregado con ExiTo')
                }
            }).catch((_e)=>{
               this.presentToast('Error de conexion')
            })
          };
      
    }else{
      this.presentToast('Campos Vacios o datos con formato incorrecto ')
    }
  }
  

  //editar o modificar Usuario
  updateUsuario(id:number, campos:any){
    return this.http.put(`${this.url}`+ `/users`+ `/${id}`, campos);
  }
  
  


  //eliminar usuario por id
  onDeleteAdiestramientos(id:any):void{
    if (!id) {   
       this.presentToast(`Campo Id vacio, Selecionar TipsAdiestramiento!`);

        }else{
          this.servicio.deleteAdiestramientos(id).then(async(re:any)=>{
        
            if(re.false){
              this.presentToast('Error al eliminar')
            }else{
                    alert(`Adiestramiento Canino #${id} se ha eliminado con exito!`);
                  }
                }).catch((_e)=>{
                   this.presentToast('Error de conexion')
                })
        }
      }
      

  onSetData(select:any){
    this.elementos.id = select.id;
    this.elementos.titulo = select.titulo;
    this.elementos.detalle = select.detalle;

    this.elementos.extra = select.extra;
    
  }

  clear(){
    this.elementos.id = "";
    this.elementos.titulo = "";
    this.elementos.detalle= "";
    this.elementos.extra = "";

  }

}
