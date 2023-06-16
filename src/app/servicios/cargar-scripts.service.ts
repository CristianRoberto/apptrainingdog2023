import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarScriptsService {
  constructor() { }

  /*Carga( archivos:string[])
  {
    for( let archivo of archivos )
    {
      let script = document.createElement("script");
      script.src = "../src/assets/js/app/" + archivo + ".js";
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
    }
  
  }*/
  
  public loadScript(){
    console.log('preparation to load....')
    let node = document.createElement('script');
    node.src='assets/js/app.js';
    node.async = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  }
  