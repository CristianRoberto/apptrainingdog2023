import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController,LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import {UserService} from '../../servicios/user.service';

import {

  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-editarperfilusuario',
  templateUrl: './editarperfilusuario.component.html',
  styleUrls: ['./editarperfilusuario.component.scss'],
})
export class EditarperfilusuarioComponent implements OnInit {
  public user:any=[];
  public registros: any[] = []; // Agrega esta línea
  elementos:any = {
    formato: "",
     };
  public previsualizacion!: string;
  public archivos: any = []

  public archivoCargado:any;
  public totalArchivoCargado = 0;
  public tamanioArchivoCargado = 0;
  constructor(public fb: FormBuilder,
    public popover: PopoverController,
    public toast: ToastController,
    private servicio: UserService,
    public alertController: AlertController,
    private sanitizer: DomSanitizer,
    public navCtrl: NavController) {
   
  }

  ngOnInit() {
    this.user = window.localStorage.getItem('datos');
    this.user=(JSON.parse(this.user));
    this.user.token = this.user.token.toString().toUpperCase();
  }


  cargaArchivo2(event: any): any{
    this.archivoCargado = event.target.files[0];
this.archivos.push(this.archivoCargado);
this.extraerBase64(this.archivoCargado).then((imagen: any) => {
  this.previsualizacion = imagen.base;
  console.log(imagen);
  })
}

extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
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
    reader.onerror = error => {
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




  async exit (){
    this.popover.dismiss(); 
  }

 //editar o modificar Usuario
 //editar o modificar Usuario
 public imagenSeleccionada: any;

 onFileSelected(event: any): void {
   this.archivoCargado = event.target.files[0];
   this.archivos.push(this.archivoCargado);
   this.extraerBase64(this.archivoCargado).then((imagen: any) => {
     this.previsualizacion = imagen.base;
     console.log(imagen);
     })
   


 }
 
 onUpdateUsuario( cedula: any, correoelectronico: any, nombre: any, apellidos: any, direccion: any, telefono: any, password: any, foto: any): void {
  if (!cedula) {
    this.presentToast(`Campos Vacios, Llenar Todo los Campos`);
  } else {
    const camposActualizados: any = {
      cedula: cedula,
      correoelectronico: correoelectronico,
      nombre: nombre,
      apellidos: apellidos,
      direccion: direccion,
      telefono: telefono,
      password: password,
      formato: foto,
    };

    console.log(this.archivos)
    if (this.imagenSeleccionada) {
      // Si se ha seleccionado una imagen, se envía al servidor junto con los otros campos actualizados
      const formData = new FormData();
      formData.append('imagen', this.imagenSeleccionada, this.imagenSeleccionada.name);
      formData.append('camposActualizados', JSON.stringify(camposActualizados));

      this.servicio.updateUsuario(this.user.token, formData).subscribe(res => {
        if (res) {
          alert(`El usuario número ${this.user.token} se ha modificado con éxito!`);
          this.clear();
          // this.onDataTable();
        } else {
          alert('Error! :(')
        }
      });
    } else {
      // Si no se ha seleccionado una imagen, solo se actualizan los otros campos
      this.servicio.updateUsuario(this.user.token, camposActualizados).subscribe(res => {
        if (res) {
          alert(`El usuario número ${this.user.token} se ha modificado con éxito!`);
          this.clear();
          // this.onDataTable();
        } else {
          alert('Error! :(')
        }
      });
    }
  }
}


 clear(){
  this.elementos.id ="";
  this.elementos.cedula = "";
  this.elementos.correoelectronico= "";
  this.elementos.nombre = "";
  this.elementos.apellidos = "";
  this.elementos.direccion = "";
  this.elementos.telefono = "";
  this.elementos.password = "";
  this.elementos.foto = "";

}

}
