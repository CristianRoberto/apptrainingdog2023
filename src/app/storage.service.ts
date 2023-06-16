import { Injectable } from '@angular/core';
import { SessionService } from 'src/app/session.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
 
  public localStorageService:any;
  public currentSession: SessionService;
 // private localStorageService;
 // private currentSession:SessionService=null;

  constructor(private router:Router) { 
      this.localStorageService=localStorage;
      this.currentSession=this.CargarDatos();
  }  
CrearSession(session:SessionService){
  this.currentSession=session;
  this.localStorageService.setItem('datos', JSON.stringify(session));
}


CargarDatos(): SessionService {
  let datos:any=this.localStorageService.getItem("datos");
  return <SessionService> (JSON.parse(datos));
   // return (datos) ? <SessionService> JSON.parse('datos");
}

getCurrentUser(){
  var session: SessionService = this.CargarDatos();
  return (session && session.token) ? session.token : null;
};

}