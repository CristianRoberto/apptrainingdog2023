import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { NgForm } from '@angular/forms';
import { UserService } from '../../servicios/user.service';
import { PopoverController } from '@ionic/angular';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dog-details-modal',
  templateUrl: './dog-details-modal.component.html',
  styleUrls: ['./dog-details-modal.component.scss'],
})
export class DogDetailsModalComponent implements OnInit {

  @Input() photo: string | any;
  @Input() description: string | any;
  @Input() location: string | any;

  elementos: any = {};

  constructor(private modalController: ModalController,
    public toastController: ToastController,
    private servicio: UserService,
    public popover: PopoverController,
    private router: Router) { }


  ngOnInit() {}

  async obtenerImagen() {
    try {
      const image = await this.capturarImagen(); // Función para capturar la imagen
      this.photo = image.dataUrl; // Asigna la imagen a la propiedad photo para mostrarla en la interfaz
      this.elementos.imagenperro = image.dataUrl; // Establece la imagen directamente en el modelo elementos
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
    }
  }

  async capturarImagen() {
    try {
      const image = await Plugins['Camera']['getPhoto']({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      return image;
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
      throw error; // Re-lanza el error para que sea manejado por el código que llama a esta función
    }
  }
  
  async obtenerUbicacion() {
    try {
      const posicion = await Geolocation.getCurrentPosition();
      console.log('Posición obtenida:', posicion);
      // Usa la posición según sea necesario
    } catch (error) {
      console.error('Error al obtener la posición:', error);
    }
  }
  
  closeModal() {
    this.modalController.dismiss();
  }

  async exit() {
    this.popover.dismiss();
  }



  async Guardar(producForm: NgForm) {
    console.log("guardar reporte abandono")
    console.log(producForm.value);
  
    // Agregar la propiedad 'photo' al objeto 'producForm.value'
    if (this.photo) {
      producForm.value.imagenperro = this.photo;
    }
  
    try {
      // Enviar los datos al servicio
      const re: any = await this.servicio.postreporteAbandono(producForm.value);
      if (re.false) {
        this.presentToast('Error al guardar');
      } else {
        await this.modalController.dismiss(); // Cerrar el modal
  
        // Redirigir al usuario a la ruta deseada
        await this.router.navigateByUrl('/tabs/tabs/tab4');
        this.presentToast('Reporte de Abandono Registrado con Éxito');

      }
    } catch (error) {
      this.presentToast('Error de conexión');
    }
  }





  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}