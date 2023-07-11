import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController,LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import {UserService} from '../servicios/user.service';
import { PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.page.html',
  styleUrls: ['./adopciones.page.scss'],
})
export class AdopcionesPage implements OnInit {

  @ViewChild(IonContent) content: IonContent | any;

  public previsualizacion!: string;
  public archivos: any = []
  products:any=[];
  auxproducts=[];
  searchedUser: any;
  elementos:any = {
   
    tipob: "",
    bus:''

     };



    



  public archivoCargado:any;
     public totalArchivoCargado = 0;
     public tamanioArchivoCargado = 0;
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
                   if(this.elementos.tipob=='idadopcion'){
            return(item.idadopcion.toString().toLowerCase().indexOf(val.toLowerCase()) >-1)
          }else if(this.elementos.tipob=='idcedula'){
            return(item.idcedula?.toString().toLowerCase().indexOf(val.toLowerCase()) >-1)
          }else if(this.elementos.tipob=='fecharetiro'){
            return(item.fecharetiro.toString().toLowerCase().indexOf(val.toLowerCase()) >-1)

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
    this.servicio.getAdopciones().then ( async (re:any)=>{
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

 


  async presentToast(message:any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }




    //editar o modificar Usuario
    public imagenSeleccionada: any;

    onFileSelected(event: any): void {
      this.imagenSeleccionada = event.target.files[0];
    }
    
    onUpdateAdopciones(idadopcion: any, idcedula: any, idmascota: any, nombreusuario: any, apellidousuario: any, fecharetiro: any, password: any): void {
      if (!idadopcion) {
        this.presentToast(`#Adopcion No selecionado, Verificar`);
      } else {
        const camposActualizados: any = {
          idcedula: idcedula,
          idmascota: idmascota,
          nombreusuario: nombreusuario,
          apellidousuario: apellidousuario,
          fecharetiro: fecharetiro,
          password: password,
        };
    
          const formData = new FormData();
          formData.append('camposActualizados', JSON.stringify(camposActualizados));
       this.servicio.onUpdateAdopciones(idadopcion, camposActualizados).subscribe(res => {
            if (res) {
              alert(`La adopcion número ${idadopcion} del usuario ${idcedula} se ha modificado con éxito!`);
              this.clear();
              // this.onDataTable();
            } else {
              alert('Error! :(')
            }
          });
        
        }
      }
    
  //eliminar Adopcion por idAdopcion
  onDeleteAdopciones(idadopcion:any):void{
    if (!idadopcion) {   
       this.presentToast(`Campo Id vacio, Selecionar Adopcion!`);

        }else{
          this.servicio.deleteAdopciones(idadopcion).then(async(re:any)=>{
        
            if(re.false){
              this.presentToast('Error al eliminar')
            }else{
                    alert(`El reporte de la adopcion número ${idadopcion} se ha eliminado con exito!`);
                  }
                }).catch((_e)=>{
                   this.presentToast('Error de conexion')
                })
        }
      }
      

  onSetData(select:any){
    this.elementos.idadopcion = select.idadopcion;
    this.elementos.idcedula = select.idcedula;
    this.elementos.idmascota = select.idmascota;

    this.elementos.nombreusuario = select.nombreusuario;
    this.elementos.apellidousuario = select.apellidousuario;

    this.elementos.fecharetiro = select.fecharetiro;
    this.elementos.password = select.password;
  }

  clear(){
    this.elementos.idadopcion = "";
    this.elementos.idcedula = "";
    this.elementos.idmascota= "";

    this.elementos.nombreusuario = "";
    this.elementos.apellidousuario = "";

    this.elementos.fecharetiro = "";
    this.elementos.password = "";
  }
  scrollToBottom() {
    this.content.scrollToBottom(300); // El número 300 representa la duración de la animación en milisegundos.
  }


}
