import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController, AlertController, NavController } from '@ionic/angular';
import { UserService } from '../../servicios/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-registroadopcion',
  templateUrl: './registroadopcion.component.html',
  styleUrls: ['./registroadopcion.component.scss'],
})
export class RegistroadopcionComponent implements OnInit {

  fechaSeleccionada: string = '';
  elementos: any = {
    idmascota: "",
    idcedula: "" ,// Agregamos el campo idcedula en el objeto elementos
    nombreusuario: "",
    apellidousuario: "",
    fecharetiro: ""
    
  };

  minDate: string = format(new Date(), 'yyyy-MM-dd'); // Inicialización directa

  showCalendar: boolean = false;
  terminosCheckbox: boolean = false;
  profileId: any;
  chracter: any;
  public user: any = [];
  public mascota: any = [];
  public archivos: any = []
  public archivoCargado: any;
  public totalArchivoCargado = 0;
  public tamanioArchivoCargado = 0;
  fotoMascota: any;
  idmascota: any;

  constructor(public fb: FormBuilder,
    public popover: PopoverController,
    private servicio: UserService,
    public toast: ToastController,
    public popoverController: PopoverController,
    public alertController: AlertController,
    private router: Router,
    public navCtrl: NavController
  ) {}



  onDateSelect(event: any) {
    const selectedDate = event.detail.value;
    this.elementos.fecharetiro = selectedDate.substring(0, 10); // Obtén solo la parte de la fecha (yyyy-MM-dd)
  }



  async ngOnInit(): Promise<void> {
   // Obtener la fecha actual
   const today = new Date();
   // Formatear la fecha en el formato deseado (yyyy-MM-dd)
   this.minDate = format(today, 'yyyy-MM-dd');

    this.user = window.localStorage.getItem('datos');
    this.user = JSON.parse(this.user);
    this.mascota = window.localStorage.getItem('mascota');
    this.mascota = JSON.parse(this.mascota);
    this.fotoMascota = this.mascota.foto;
    this.idmascota = this.mascota.mascota;

    // Check if this.mascota.foto is a Blob object before reading it as a data URL
    if (this.mascota.foto instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.fotoMascota = event.target.result;
      };
      reader.readAsDataURL(this.mascota.foto);
    }

    // Asignar this.mascota.mascota a this.elementos.idmascota
    this.elementos.idmascota = this.mascota.mascota;
    this.elementos.idcedula = this.user.cedula;
    this.elementos.nombreusuario = this.user.nombre;
    this.elementos.apellidousuario = this.user.apellidos;


    const alert = await this.alertController.create({
      header: '¡Atención! Llenar datos',
      message: 'Debe Confirmar y Llenar todos los datos del registro de adopcion correctamente',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            // Verificar si se ha aceptado los términos y condiciones
          }
        }
      ],
    });
    await alert.present();
  }

  
   // Variable para controlar el estado de la actualización
   isRefreshing: boolean = false; 
    handleRefresh(event: any ): void {
    if (this.isRefreshing) {
    return; // Evita iniciar una nueva actualización mientras una ya está en curso
  }
  this.isRefreshing = true; // Marca la actualización como en curso
// // // Simula una carga de datos con un retardo de 2 segundos
  setTimeout(() => {
  this.isRefreshing = false; // Marca la actualización como completada
// // // Realiza cualquier otra acción necesaria
// // // Reinicia la variable isRefreshing para futuras actualizaciones
  this.isRefreshing = false;
  }, 2000);
  }


  // async handleRefresh(event: any): Promise<void> {
  //   // Simula una carga de datos con un retardo de 2 segundos
  //   setTimeout(() => {
  //     // Realiza cualquier otra acción necesaria
  //     // Reinicia la variable isRefreshing para futuras actualizaciones
  //     this.isRefreshing = false;
  //   }, 2000);
  // }

  async Guardar(producForm: NgForm) {
    if (producForm.valid) {
      if (this.user.cedula == this.elementos.idcedula) {
        if (this.mascota.mascota == this.elementos.idmascota) {
          if (this.user.password == this.elementos.password) {
            // Agregar la foto de la mascota al formulario si no es null
            if (this.fotoMascota) {
              producForm.value.foto = this.fotoMascota;
            }
            if (!producForm.value.estadoadopcion) {
              producForm.value.estadoadopcion = 'No Retirado';
            }
            // Mostrar alerta de confirmación antes de guardar
            const alert = await this.alertController.create({
              header: 'Aceptar Términos y Condiciones',
              message: '¡Atención! Antes de realizar la adopción canina, es importante que tenga en cuenta ciertos aspectos. En primer lugar, se espera que retire a la mascota adoptada en un plazo máximo de 5 días después de la fecha indicada. Si no es posible retirarla en ese plazo, la mascota se pondrá nuevamente en adopción y en caso de volver a realizar otra adopción y reincidir no retirando la mascota en la fundación, su perfil quedará eliminado definitivamente y no podrá volver a utilizar nuestros servicios por falta de ética y moral hacia nuestra fundación. Es importante indicar que, una vez que acepte los términos y condiciones para la adopción, no podrá cancelarla, ya que esto sería irrespetuoso y poco ético para nosotros la fundación, como para los demás usuarios que quieren adoptar estas mascotas. Le recomendamos que lea detenidamente y esté seguro antes de realizar la adopción. Si no está seguro, es preferible que cancele su adopción para evitar cualquier inconveniente futuro. Recuerde que la adopción de una mascota es una decisión importante que implica una responsabilidad y un compromiso a largo plazo. ¡Gracias por su comprensión!',
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel'
                },
                {
                  text: 'Aceptar',
                  handler: () => {
                    this.handleRefresh(event);
                    // Verificar si se ha aceptado los términos y condiciones
                    if (this.terminosCheckbox ?? false) {
                      // Enviar el formulario al servicio de adopciones
                      this.servicio.postAdopciones(this.fotoMascota, producForm.value)
                        .then(async (response: any) => {
                          if (response.error) {
                            this.presentToast('Error al guardar');
                          } else {
                            this.servicio.deleteMascotas(this.idmascota);
                            const alert = await this.alertController.create({
                              header: 'Felicidades',
                              message: 'Adopción realizada con éxito<br> Te esperamos pronto',
                              buttons: [
                                {
                                  text: 'OK',
                                  cssClass: 'custom-button adopt-button',
                                  handler: async () => {
                                    this.handleRefresh(event); // No es necesario pasar el evento aquí
                                  }
                                }
                              ]
                            });
                            await alert.present();
                            this.handleRefresh(event);
                            await this.popover.dismiss({
                              cont: 1,
                            });
                            this.router.navigateByUrl('/tabs/tabs/tab3');
                            this.handleRefresh(event);
                          }
                        })
                        .catch(() => {
                          this.presentToast('Error de conexión');
                        });
                    } else {
                      this.presentToast('Debes aceptar los términos y condiciones para realizar la adopción');
                    }
                  }
                }
              ],
              inputs: [
                {
                  name: 'terminos',
                  type: 'checkbox',
                  label: 'Acepto los términos y condiciones',
                  value: 'acepto',
                  checked: false,
                  handler: (data) => {
                    this.terminosCheckbox = data.checked ?? false; // Actualizar el valor de la variable terminosCheckbox
                  }
                }
              ]
            });
            await alert.present();
          } else {
            const alert = await this.alertController.create({
              header: 'Contraseñas incorrectas',
              message: 'La contraseña que ingresaste no coincide con tu clave',
            });
            await alert.present();
          }
        } else {
          const alert = await this.alertController.create({
            header: 'IdMascota incorrecto',
            message: 'El idMascota no coinciden con tu seleccion',
          });
          await alert.present();
        }
      } else {
        const alert = await this.alertController.create({
          header: 'Cédula incorrecta',
          message: 'La cédula que ingresaste no pertenece',
        });
        await alert.present();
      }
    } else {
      this.presentToast('Datos vacíos, completar datos correctamente');
    }
  }

  async exit() {
    this.popover.dismiss();
  }

  async presentToast(message: any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

 

}