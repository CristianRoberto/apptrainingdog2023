import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

    public token: any;
    public usuario: any;
    public nombre: any;
    public apellidos: any;
    public direccion:any;
    public password: any;

}
