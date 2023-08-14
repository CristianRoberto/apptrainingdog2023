import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../../servicios/user.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { StorageService } from '../../storage.service';
import { SessionService } from '../../session.service';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-popoverlogi',
  templateUrl: './popoverlogi.component.html',
  styleUrls: ['./popoverlogi.component.scss'],
})
export class PopoverlogiComponent implements OnInit {
  formulario: any = FormGroup;
  mensaje: string = "";
  datos: any;
  token: string = "";
  logueado: Boolean = false;

  usuarioAdministrador = {
    cedula: '1311417420',
    usuario: 'cristianrobertogilcespanta@gmail.com',
    nombre: 'cristian roberto',
    apellidos: 'gilces panta',
    direccion: 'bahia de caraquez',
    rol: 'administrador',
    password: 'gp1994'
  };



  constructor(private form: FormBuilder, private servicio: UserService,
    public toast: ToastController,
    public popover: PopoverController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private storage: StorageService) {
    //aqi se hace llamado a los datos que se envian del from
    this.formulario = this.form.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rut: ['', [Validators.pattern("[0-9]-"), Validators.max(9)]]
    });
  }

  ngOnInit() {
  }

  //if(this.storage.getCurrentUser()){
  //this.logueado=true;
  // this.mensaje="Usted ya se encuentra logueado";
  //}

  async exit() {
    this.popover.dismiss();
  }
  async ValidarLogin(): Promise<any> {
    if (this.formulario.valid) {
      const usuarioControl = this.formulario.get("usuario");
      const passwordControl = this.formulario.get("password");

      if (usuarioControl && passwordControl && usuarioControl.value && passwordControl.value) {
        const usuarioIngresado = usuarioControl.value.trim();
        const passwordIngresado = passwordControl.value.trim();

        console.log("Usuario ingresado:", usuarioIngresado);
        console.log("Contraseña ingresada:", passwordIngresado);

        if (
          usuarioIngresado === this.usuarioAdministrador.usuario &&
          passwordIngresado === this.usuarioAdministrador.password) {
          // Iniciar sesión como usuario administrador
          console.log("Iniciando sesión como usuario administrador")
          const datosUsuarioAdmin = {
            cedula: this.usuarioAdministrador.cedula,
            usuario: this.usuarioAdministrador.usuario,
            nombre: this.usuarioAdministrador.nombre,
            apellidos: this.usuarioAdministrador.apellidos,
            direccion: this.usuarioAdministrador.direccion,
            password: this.usuarioAdministrador.password,
            rol: this.usuarioAdministrador.rol

          };
          localStorage.setItem('datos', JSON.stringify(datosUsuarioAdmin));
          // Redirigir a la página del perfil de administrador
          window.location.href = "http://localhost:8100/perfiladmin/tabs/usuarios";
        } else {
          this.servicio.Token().subscribe(async token => {
            this.token = token;
            this.servicio.ValidarLogin(usuarioIngresado, passwordIngresado, this.token).subscribe(async datos => {
              console.log(datos);
              if (datos.length == 0) {
                this.mensaje = "Usuario o Contraseña incorrecta, Verificar";
              } else {
                const loading = await this.loadingController.create({ message: 'Cargando...' });
                await loading.present();
                datos = {
                  token: datos[0].id,
                  cedula: datos[0].cedula,
                  usuario: datos[0].correoelectronico,
                  nombre: datos[0].nombre,
                  apellidos: datos[0].apellidos,
                  direccion: datos[0].direccion,
                  password: datos[0].password
                };
                this.storage.CrearSession(datos);
                window.location.href = "/tabs/tabs/tab4";
                this.presentToast('Datos Correcto, Bienvenido');
              }
            });
          });
        }
      } else {
        this.presentToast('Campos Vacios o formato incorrecto');
      }
    } else {
      this.presentToast('Campos Vacios o formato incorrecto');
    }
  }






  //funcion boton que me dirige a la pantalla registro
  async registrarse() {
    await this.popover.dismiss({
      cont: 0
    });
  }
  async presentToast(message: any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  async recuperarClave() {
    console.log(this.formulario.value.usuario);
    if (!this.formulario.value.usuario)
      this.presentToast('Ingresar Correo electronico, para recuperar Clave');
    else {
      this.servicio.recuperarContrasena(this.formulario.value.usuario).subscribe(async (re: any) => {
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
        this.presentToast('Error de Conexion Servidor');
      });
    }
  };
}