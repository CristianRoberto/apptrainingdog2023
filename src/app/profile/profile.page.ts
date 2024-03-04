import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RestService } from '../rest.service';
import { PopoverController } from '@ionic/angular';
import { RegistroadopcionComponent } from "../components/registroadopcion/registroadopcion.component";
import {StorageService} from '../storage.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  datos: any;
  chracter: any;
  respuesta: any;
  profileId: any;
  mensaje:any;
//  chracter;

  constructor(
    private route:ActivatedRoute,
    public loadingController: LoadingController,
    private storage:StorageService,
    public popover: PopoverController,
    private activatedRoute: ActivatedRoute,
    private RestService:RestService
  ) {}
  
  ngOnInit(): void {
    this.profileId = this.activatedRoute.snapshot.paramMap.get("id");
       this.route.paramMap.subscribe((paramMap:any)=>{
        const{params}=paramMap
        this.cargarData(params.variable)
       })
      }

     public async cargarData(id:string){
        //hago la peticion al servicio RESTSERVICE
        const loading = await this.loadingController.create({ message: 'Cargando...' });
      await loading.present();
        this.RestService.get(`http://127.0.0.1:5000/mascotas/${this.profileId}`)
        .subscribe(async respuesta =>{
          this.chracter = respuesta;


          const objeto = Array.isArray(respuesta) ? respuesta.reduce((acc:any, val:any) => Object.assign(acc, val), {}) : respuesta;

          const data = {
            mascota: this.profileId,
            foto: objeto.foto
          };
          localStorage.setItem('mascota', JSON.stringify(data));
          await loading.dismiss();

        });
    }

      

    //componenteadoptar
  async componenteadoptar(){
    const alert = await this.popover.create({
      component:  RegistroadopcionComponent,
      mode:'ios',
      cssClass: 'pop-over-style3',
      });
    return await alert.present()
       }


}

    