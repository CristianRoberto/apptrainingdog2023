// import { Component, OnInit } from '@angular/core';
// import { Camera, CameraResultType } from '@capacitor/camera'; // Importa Camera
// import { StorageService } from '../storage.service'; // Importa StorageService

// @Component({
//   selector: 'app-tabs',
//   templateUrl: 'tabs.page.html',
//   styleUrls: ['tabs.page.scss']
// })
// export class TabsPage implements OnInit {
//   constructor(private storage: StorageService) {}

//   ngOnInit() {}

//   // async abrirCamara() {
//   //   try {
//   //     const image = await Camera.getPhoto({ // Utiliza Camera.getPhoto directamente
//   //       quality: 90,
//   //       allowEditing: true,
//   //       resultType: CameraResultType.Uri
//   //     });
      
//   //     // Aquí puedes procesar la imagen capturada si es necesario
//   //     console.log('Imagen capturada:', image);
//   //   } catch (error) {
//   //     console.error('Error al abrir la cámara:', error);
//   //   }
//   // }
// }







import { Component, OnInit } from '@angular/core';
import {  Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importa Camera
import {StorageService} from '../storage.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';
// import { DogDetailsModalPage } from '../../../dog-details-modal/dog-details-modal.page';
import { DogDetailsModalComponent } from '../components/dog-details-modal/dog-details-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
   photo: SafeResourceUrl | any;

  constructor(private storage:StorageService,private sanitizer: DomSanitizer, private modalController: ModalController) { }
  ngOnInit() {

    //mira en el local store al ejecutar esta pantalla tabs
    //si no encuentra datos en store te redirigue a la pantalla principál.
    //if(!this.storage.getCurrentUser()){
     // window.location.href="/princi";
    }    


// async abrirCamara() {
//   try {
//     const image = await Camera.getPhoto({
//       quality: 90,
//       allowEditing: true,
//       resultType: CameraResultType.Uri
//     });
    
//     // Aquí puedes procesar la imagen capturada si es necesario
//     console.log('Cámara abierta');
//     console.log('Imagen capturada:', image);
//   } catch (error) {
//     console.error('Error al abrir la cámara:', error);
//   }
// }


// async abrirCamara() {
//   try {
//     const image = await Plugins['Camera']['getPhoto']({
//       quality: 100,
//       allowEditing: false,
//       resultType: CameraResultType.DataUrl,
//       source: CameraSource.Camera
//     });

//     this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && image.dataUrl);
//          console.log('Cámara abierta');
//          console.log('Imagen capturada:', image);
//   } catch (error) {
//     console.error('Error al abrir la cámara:', error);
//   }
// }



async abrirCamara() {
  try {
    // const image = await Plugins.Camera.getPhoto({
    const image = await Plugins['Camera']['getPhoto']({

      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    const modal = await this.modalController.create({
      component: DogDetailsModalComponent,
      componentProps: {
        photo: image && image.dataUrl,
        // description: 'Descripción del perro',
        // location: 'Ubicación del perro'
      }
    });
    await modal.present();
  } catch (error) {
    console.error('Error al abrir la cámara:', error);
  }
}
}





//   import { Component, OnInit } from '@angular/core';
// import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'camera',
//   templateUrl: './camera.component.html',
//   styleUrls: ['./camera.component.scss'],
// })
// export class CameraComponent implements OnInit {
//   photo: SafeResourceUrl;

//   constructor(private sanitizer: DomSanitizer) { }

//   ngOnInit() {}

//   async takePicture() {
//     const image = await Plugins.Camera.getPhoto({
//       quality: 100,
//       allowEditing: false,
//       resultType: CameraResultType.DataUrl,
//       source: CameraSource.Camera
//     });

//     this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
//   }
// }