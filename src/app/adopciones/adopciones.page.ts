import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController,LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import {UserService} from '../servicios/user.service';
import { PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { IonContent } from '@ionic/angular';

import { AlertController, NavController, Platform } from '@ionic/angular';

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

  selectedRow: any = null;

  selectRow(select:any, event: Event,item: any) {
    event.stopPropagation(); // Evita que el evento se propague a la fila
 this.selectedRow = select;
       this.elementos.idadopcion = select.idadopcion;
       this.elementos.idcedula = select.idcedula;
       this.elementos.idmascota = select.idmascota;
       this.elementos.nombreusuario = select.nombreusuario;
       this.elementos.apellidousuario = select.apellidousuario;
       this.elementos.fecharetiro = select.fecharetiro;
       this.elementos.password = select.password;
    this.selectedRow = item;
  }
     public archivoCargado:any;
     public totalArchivoCargado = 0;
     public tamanioArchivoCargado = 0;


  constructor(
    public alertController: AlertController,
    public popover: PopoverController,
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
        })  
      }else{
      this.products=this.auxproducts;
      }
    }else{
     this.presentToast('Seleccione un criterio de busqueda');
    }
  }


  isRefreshing: boolean = false; // Variable para controlar el estado de la actualización

handleRefresh(event: any): void {
  if (this.isRefreshing) {
    return; // Evita iniciar una nueva actualización mientras una ya está en curso
  }
  this.isRefreshing = true; // Marca la actualización como en curso
  this.search(); // Realiza la búsqueda de datos
  // Simula una carga de datos con un retardo de 2 segundos
  setTimeout(() => {
    this.isRefreshing = false; // Marca la actualización como completada
    // Realiza cualquier otra acción necesaria

    // Reinicia la variable isRefreshing para futuras actualizaciones
    this.isRefreshing = false;
  }, 2000);
}  


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
    cambiarEstadoAdopcion(item:any) {
      if (item.estadoadopcion === 'Retirado') {
        item.estadoadopcion = 'No Retirado';
        item.checked = false; // Desmarcar el checkbox
      } else {
        item.estadoadopcion = 'Retirado';
        item.checked = true; // Marcar el checkbox
      }
    }

  
      
    async onSetData(select: any, event: Event, item: any) {
      if (select.estadoadopcion === 'Retirado') {
        this.servicio.updateEstadoAdopcion(select.idadopcion, 'Retirado').subscribe(
          async (response) => {         
            const alert = await this.alertController.create({
              cssClass: 'custom-alert',
              header: '¡ Actualizacion Exitosa ¡',
              message: 'El Estado de la Mascota ha sido actualizado "RETIRADO" con éxito',
              buttons: [
                {
                  text: 'OK',
                  cssClass: 'custom-button adopt-button',
                  handler: () => {
                    this.handleRefresh(event);
                  }
                }
              ]
            });
        
            await alert.present();
          },
          (error) => {
            console.error('Error al actualizar el estado', error);
          }
        );
      } else {

        const alert = await this.alertController.create({
          cssClass: 'custom-alert',
          header: 'X Error X',
          message: 'Estado no es "Retirado", no se realiza la actualización',
          buttons: [
            {
              text: 'OK',
              cssClass: 'custom-button adopt-button',
              handler: () => {
              }
            }
          ]
        });
        await alert.present();

        
        console.log('Estado no es "Retirado", no se realiza la actualización');
      }
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
