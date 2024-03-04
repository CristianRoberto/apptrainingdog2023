import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
//  get_logi(correo: any) {
  //  throw new Error('Method not implemented.');
  //}
 
  //url:any ='https://api.marinosalava.com/';
  url:any ='http://127.0.0.1:5000';

  
  


  constructor(private http:HttpClient) {   
  }

  //este es un servicio creo una funcion validar login permite atravez del get conectarme al bankEnd
  ValidarLogin(usuario:string,password:string,token:string):Observable<any>{
    let headers=new HttpHeaders();
    headers= headers.append('Content-Type', 'application/json');
    headers= headers.append('access-token',token);
    
    const params = new HttpParams();
    params.set("usuario",usuario);
    params.set("password", password); //Create new HttpParams
     //return this.http.get(`${environment.apiUrl}/login`,{params:params});
     //let url=`${environment.apiUrl}/login?usuario=${JSON.stringify(usuario)}&password=${JSON.stringify(password)}`;
     return this.http.get(`${environment.apiUrl}/usrs?usuario=${usuario}&password=${password}`,{ 'headers': headers });
  }

  Token():Observable<any>{
     return this.http.get(`${environment.apiUrl}/usrs`);
  }

  //servicioUsuario//registrar  nuevo usuarios
  getusuarios(){
    return this.http.get(`${this.url}`+ `/users`,
  {headers:{"Content-Type":"application/json"}}).toPromise()
    }

    getUsuariosById(id: number) {
      return this.http.get(`${this.url}`+ `/users/${id}`,
      {headers:{"Content-Type":"application/json"}}).toPromise()
    }

    recuperarContrasena(correoelectronico: any) {
      return this.http.post<any>(`${this.url}`+ `/recuperar`, {correoelectronico: correoelectronico},
        {headers:{"Content-Type":"application/json"}});
    }
      


  postuser(users: any){
    return this.http.post(`${this.url}`+ `/users`, users,
  {headers:{"Content-Type":"application/json"}}).toPromise()
  }

  deleteuser(id:any){
    return this.http.delete(`${this.url}`+ `/users`+ `/${id}`,
    {headers:{"Content-Type":"application/json"}}).toPromise()
  }
  updateUsuario(id: any, camposActualizados: FormData): Observable<any> {
    return this.http.put<any>(`${this.url}/users/${id}`, camposActualizados);
  }


    //servicio Mascotas//registrar  nuevo mascota
    getMascotas(){
      return this.http.get(`${this.url}`+ `/mascotas`,
    {headers:{"Content-Type":"application/json"}}).toPromise()
    }
    
    postMascotas(adopciones: any){
      return this.http.post(`${this.url}`+ `/mascotas`, adopciones,
    {headers:{"Content-Type":"application/json"}}).toPromise()
    }

    deleteMascotas(id:any){
      return this.http.delete(`${this.url}`+ `/mascotas`+`/${id}`,
      {headers:{"Content-Type":"application/json"}}).toPromise()
    }
   
   //servicio Adopcion
    getAdopciones(){
      return this.http.get(`${this.url}`+ `/adopciones`,
    {headers:{"Content-Type":"application/json"}}).toPromise()
      }
      getAdopcionesById({ idcedula }: { idcedula: any; }): Promise<Object | any> {
        return this.http.get(`${this.url}`+ `/adopciones/${idcedula}`,
        {headers:{"Content-Type":"application/json"}}).toPromise()
      }
      postAdopciones(foto: string, formulario: any) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const url = `${this.url}/adopciones`;
        // Agregar la imagen al formulario si no es null
        if (foto) {
          formulario.foto = foto;
        }
      
        return this.http.post(url, JSON.stringify(formulario), { headers }).toPromise();
      }
    
      deleteAdopciones(idadopcion:any){
        return this.http.delete(`${this.url}`+ `/adopciones` + `/${idadopcion}`,
        {headers:{"Content-Type":"application/json"}}).toPromise()
      }
    onUpdateAdopciones(idadopcion: any, camposActualizados: FormData): Observable<any> {
       return this.http.put<any>(`${this.url}/adopciones/${idadopcion}`, camposActualizados);
     }
    
      updateEstadoAdopcion(idadopcion: any, nuevoEstado: any): Observable<any> {
        const url = `${this.url}/adopciones/${idadopcion}`;
        const body = { estadoAdopcion: nuevoEstado };
        return this.http.put(url, body);
      }
  

    //servicio adiestramiens// crud Adiestramientos//
    getAdiestramientos(){
      return this.http.get(`${this.url}`+ `/adiestramientos`,
    {headers:{"Content-Type":"application/json"}}).toPromise()
      }
      postAdiestramientos(adopciones: any){
        return this.http.post(`${this.url}`+ `/adiestramientos`, adopciones,
      {headers:{"Content-Type":"application/json"}}).toPromise()
      }

      deleteAdiestramientos(id:any){
        return this.http.delete(`${this.url}`+ `/adiestramientos` + `/${id}`,
        {headers:{"Content-Type":"application/json"}}).toPromise()
      }

}