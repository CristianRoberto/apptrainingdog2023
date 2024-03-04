import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserService } from '../../servicios/user.service';
import { PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-popoverregistro',
  templateUrl: './popoverregistro.component.html',
  styleUrls: ['./popoverregistro.component.scss'],
})
export class PopoverregistroComponent implements OnInit {

  logueado: Boolean = false;
  mensaje: string = "";

  elementos: any = {
    formato: "",
  };
  public previsualizacion!: string;
  public archivos: any = []

  public archivoCargado: any;
  public totalArchivoCargado = 0;
  public tamanioArchivoCargado = 0;
  constructor(public popover: PopoverController,
    public toast: ToastController,
    private sanitizer: DomSanitizer,
    private servicio: UserService) { }

  ngOnInit() {
    /*let datos= JSON.parse(localStorage.getItem('sitiomovil'));
    if(datos && datos.usuario){
        window.location.href="/privado";
    }*/
  }

  async exit() {
    this.popover.dismiss();
  }

  cargaArchivo2(event: any): any {
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

  cargaArchivo(archivo: any): Promise<void> | any {
    this.archivoCargado = archivo[0];
    this.totalArchivoCargado = archivo.length;
    this.tamanioArchivoCargado = archivo[0].size / 1024;
    let externsion = this.getFileExtension({ filename: this.elementos.formato })
    if (externsion == 'JPG' || externsion == 'jpg' || externsion == 'PNG' || externsion == 'png') {

    } else {
      this.archivoCargado = null;
      this.totalArchivoCargado = 0;
      this.tamanioArchivoCargado = 0;
      this.elementos.formato = "";
      return this.presentToast("Solo se aceptan  archivo en formato Png y Jpg");
    }
  }

  getFileExtension({ filename }: { filename: any; }): any {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  async presentToast(message: any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  Guardar(producForm: NgForm) {
    // Verificar si todos los campos están vacíos
    if (!producForm.value.telefono || !producForm.value.cedula) {
      this.presentToast('Por favor, complete todos los campos');
      return;
    }
  
    // Verificar la validez de la cédula o pasaporte
    const cedulaOrPasaporte = producForm.value.cedula;
    if (/^\d{10}$/.test(cedulaOrPasaporte)) {
      console.log('Es una cédula ecuatoriana');
      // Aquí puedes realizar las acciones específicas para una cédula ecuatoriana
    } else if (/^.{6,16}$/.test(cedulaOrPasaporte)) {
      console.log('Es un pasaporte de una persona extranjera');
      // Aquí puedes realizar las acciones específicas para un pasaporte de una persona extranjera
    } else {
      this.presentToast('La cédula o pasaporte no tiene el formato correcto');
      return;
    }
    
    // Verificar la longitud del teléfono
    const telefono = producForm.value.telefono;
    if (telefono.length !== 10) {
      this.presentToast('El teléfono debe tener 10 dígitos');
      return;
    }
  
    // El resto del código para leer el archivo y enviar los datos al servidor permanece igual
    let archivo = this.archivoCargado;
    let reader = new FileReader();
    console.log(archivo);
    reader.readAsDataURL(archivo);
    reader.onload = () => {
      let archivoByte: any = reader.result;
      archivoByte = archivoByte.toString();
      producForm.value.foto = archivoByte;
      console.log(producForm.value);
      this.servicio.postuser(producForm.value).then(async (re: any) => {
        if (re.false) {
          this.presentToast('Error al guardar');
        } else {
          this.presentToast('Usuario Creado con Éxito');
          await this.popover.dismiss({
            cont: 1
          });
        }
      }).catch((_e) => {
        this.presentToast('Error de conexión');
      });
    };
  }
  

  
  
  

}
