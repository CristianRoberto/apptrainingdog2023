import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import {UserService} from '../../servicios/user.service';
import { ToastController,LoadingController } from '@ionic/angular';
import {StorageService} from '../../storage.service';
import {SessionService} from '../../session.service';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-popoverlogi',
  templateUrl: './popoverlogi.component.html',
  styleUrls: ['./popoverlogi.component.scss'],
})
export class PopoverlogiComponent implements OnInit {

  
  formulario:any= FormGroup<any>;
  mensaje:string="";
  datos: any;
  token:string="";
  logueado:Boolean=false;
  
  constructor(private form:FormBuilder, private servicio: UserService,
    public toast: ToastController,
    public popover: PopoverController,
    public loadingController: LoadingController,
    public alertController: AlertController,

     private storage:StorageService) {
  //aqi se hace llamado a los datos que se envian del from
    this.formulario=this.form.group({
       usuario:['',[Validators.required, Validators.email]],
       password:['',Validators.required],
       rut: ['', [Validators.pattern("[0-9]-"),Validators.max(9)]]
     });
  }
 

  ngOnInit(){
  
  }
  
    //if(this.storage.getCurrentUser()){
      //this.logueado=true;
     // this.mensaje="Usted ya se encuentra logueado";
    //}

    async exit (){
      this.popover.dismiss(); 
    }

  
    async ValidarLogin(): Promise<any>{
    
  if(this.formulario.valid){      

   this.servicio.Token().subscribe(token=>{
         this.token=token;
         this.servicio.ValidarLogin(this.formulario.get("usuario").value, this.formulario.get("password").value,this.token).subscribe(async datos=>{
          console.log(datos);
         
          if(datos.length==0){
                this.mensaje="Usuario o Contraseña incorrecta,Verificar";
           }else{
            //localStorage.setItem('datos',JSON.stringify({"usuario":datos[0].correoelectronico}))
            //({usuario:datos[0].correoelectronico,nombre:datos[0].nombre};
            // this.storage.CrearSession(datos);   
             const loading = await this.loadingController.create({ message: 'Cargando...' });
              await loading.present();
             datos={
              token:datos[0].id,
              cedula:datos[0].cedula,
              usuario:datos[0].correoelectronico,
              nombre:datos[0].nombre, 
              apellidos:datos[0].apellidos, 
              direccion:datos[0].direccion, 
              password:datos[0].password };
             this.storage.CrearSession(datos);
           window.location.href="/tabs/tabs/tab4";
              this.presentToast('Datos Correcto, Bienvenido');
               }
              })
              
            });
           } else{
    this.presentToast('Campos Vacios o formato incorrecto')
      }            
          }

  //funcion boton que me dirige a la pantalla registro
  async registrarse(){
    await this.popover.dismiss({
      cont:0
     });
  }
  async presentToast(message:any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  async recuperarClave() {
    console.log(this.formulario.value.usuario);
    if(!this.formulario.value.usuario)
    this.presentToast('Ingresar Correo electronico, para recuperar Clave');
    else{
      this.servicio.recuperarContrasena(this.formulario.value.usuario).subscribe(async (re:any) => {
        if (re.false) {
          this.presentToast('datos usuario vacio');
        } else {
          const alert = await this.alertController.create({
            header: 'Recuperar Contraseña  ',
            message: 'Se ha enviado a su correo electrónico instrucciones para restablecer contraseña ',
  
          });         
           await alert.present();
  
          }
      }, (error: any) => {
        console.log(error);
        this.presentToast('Ingresar Correo Electronico');
      });
    }
  };
  
  
}