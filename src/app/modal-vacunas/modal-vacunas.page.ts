import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-vacunas',
  templateUrl: './modal-vacunas.page.html',
  styleUrls: ['./modal-vacunas.page.scss'],
})
export class ModalVacunasPage implements OnInit {
  vacunas = [
    'Parvovirus',
    'Moquillo canino (distemper)',
    'Hepatitis infecciosa canina (adenovirus tipo 1)',
    'Rabia',
    'Leptospirosis',
    'Bordetella bronchiseptica (tos de las perreras)',
    'Coronavirus canino',
    'Influenza canina',
    'Parainfluenza',
    'Lyme',
    'Leishmaniosis',
    'Giardia',
    'Canine adenovirus type 2 (CAV-2)',
    'Canine herpesvirus (CHV)',
    'Canine parainfluenza virus (CPIV)',
    'Canine respiratory coronavirus (CRCoV)',
    'Canine reovirus (CRV)',
    'Canine rotavirus (CRoV)',
    'Canine coronavirus (CCoV)',
    'Canine distemper virus (CDV)',
    'Canine adenovirus type 1 (CAV-1)',
    'Canine parvovirus (CPV)',
    'Canine adenovirus type 2 (CAV-2)',
    ];

  vacunaSeleccionada: { [key: string]: boolean } = {};

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const vacunasSeleccionadas: string[] = []; // Definir el tipo de vacunasSeleccionadas
    this.vacunas.forEach(vacuna => {
      this.vacunaSeleccionada[vacuna] = vacunasSeleccionadas.includes(vacuna);
    });
  }


  guardar() {
    const vacunasSeleccionadas = Object.keys(this.vacunaSeleccionada).filter(vacuna => this.vacunaSeleccionada[vacuna]);
    this.modalController.dismiss({ vacunasSeleccionadas }); // Envia las vacunas seleccionadas como objeto
  }

  // guardar() {
  //   // Filtra las vacunas seleccionadas y obtiene sus nombres
  //   const vacunasSeleccionadas = this.vacunas.filter(vacuna => this.vacunaSeleccionada[vacuna]);
  //   // Formatea las vacunas seleccionadas con comillas y comas
  //   const vacunasFormateadas = vacunasSeleccionadas.map(vacuna => `"${vacuna}"`).join(',');
  //   // Cierra el modal y pasa las vacunas seleccionadas como resultado
  //   this.modalController.dismiss(vacunasFormateadas);
  // }
  
  

  async exit() {
    await this.modalController.dismiss();
  }
}
