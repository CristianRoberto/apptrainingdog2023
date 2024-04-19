import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  constructor() {}

  ngOnInit() {}

  // async tomarFoto() {
  //   const image = await Camera['getPhoto']()({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: 'uri' // Use 'uri' instead of CameraResultType.Uri
  //   });

  //   // image.webPath will contain a path that can be set as an image src.
  //   // You can access the original file using image.path, which can be
  //   // passed to the Filesystem API to read the raw data of the image,
  //   // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  //   const imageUrl = image.webPath;

  //   // Set the src of an image element
  //   const imageElement = document.getElementById('your-image-id') as HTMLImageElement;
  //   imageElement.src = imageUrl;
  // }
}
