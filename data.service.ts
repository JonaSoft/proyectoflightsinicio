import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dato } from "../interface/data.interface";
import { Observable } from "rxjs"
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
   flightlist:AngularFireList<any>
   selectFlight: Dato;
   flightsUrl:string = "https://flights-4a6e1.firebaseio.com/flights.json"
   flightUrl:string = "https://flights-4a6e1.firebaseio.com/flights"


     constructor( private http: HttpClient,
                  private firebase: AngularFireDatabase) {
        console.log("Servicio Listo para CodeShare");
        // union: Dato[]=[];
     }

   newFlight(datos:Dato, valor:string){
       let body = JSON.stringify( datos );
       let headers = new HttpHeaders({
        'Content-Type':'application/json'
       });
       let nodo =  `${ this.flightUrl }/${ valor }.json`
       console.log(nodo);
       return this.http.post( nodo, body, { headers } )
       .map(res=>{
         console.log(res);
         return res
       })

   }
   updateFlight(datos:Dato,flight:string,key$:Dato){
       console.log(datos, flight, key$)
       let union:Dato[]=[];
       union.push(datos);
       union.push(key$);
       //console.log(union);
       let textofinal = JSON.stringify( union ),
           char ="{",
           char1 ="}",
           char2 ="[",
           char3 ="]",
           patron= /{/g,
           patron2=/}/g,
           nuevochar ="";
           textofinal = textofinal.replace(patron,nuevochar);
           textofinal = textofinal.replace(patron2,nuevochar);
           textofinal = textofinal.replace(char2,char);
           textofinal = textofinal.replace(char3,char1);
       //console.log(textofinal);
       let headers = new HttpHeaders({
         'Content-Type':'application/json'
       });

      let url = `${ this.flightUrl }/${flight}/${ key$['name'] }.json`;
      //console.log(url)
       return this.http.put( url, textofinal, { headers } )
       .map(res=>{
         //console.log(res);
         return res
      })
   }


   getFlightMarket(_flightini:string,_market:string){
         // market y numero de vuelo market
            console.log('market y flightini');
            return this.http.get(this.flightUrl+'/'+_flightini+'.json')
            .map( res=>res);
   }
   getFlight(_flightini:string){
            console.log('flightini');
             return this.http.get(this.flightUrl+'/'+_flightini+'.json')
             .map( res=>res);
   }
   getMarket(_flightini:string){
      console.log('market');
      return this.http.get(this.flightsUrl)
      .map( res=>res);
   }
   getOperator(_codope:string){
       console.log('operador');
       return this.http.get(this.flightsUrl)
       .map( res=>res);
   }
   getFlightOperator(_flightope:string){
       console.log('flightoperador');
       return this.http.get(this.flightsUrl)
       .map( res=>res);
   }

   insertarData(flight:Dato){
      this.flightlist.push({
             market:flight.market,
             flightini:flight.flightini,
             flightend:flight.flightend,
             origen:flight.origen,
             destino:flight.destino,
             numope:flight.numope,
             codope:flight.codope,
             fechainit:flight.fechainit,
             fechaend:flight.fechaend,
             frecuencia:flight.frecuencia,
             clase:flight.clase,
             comentario:flight.comentario,
             flightope:flight.flightope,
             timedep:flight.timedep,
             timearr:flight.timearr,
             fechareg:flight.fechareg,
             key$:flight.key$,
      });
   }
   updateData( flight:Dato ){
            this.flightlist.update(flight.key$,{
                market:flight.market,
                flightini:flight.flightini,
                flightend:flight.flightend,
                origen:flight.origen,
                destino:flight.destino,
                numope:flight.numope,
                codope:flight.codope,
                fechainit:flight.fechainit,
                fechaend:flight.fechaend,
                frecuencia:flight.frecuencia,
                clase:flight.clase,
                comentario:flight.comentario,
                flightope:flight.flightope,
                timedep:flight.timedep,
                timearr:flight.timearr,
                fechareg:flight.fechareg,
                key$:flight.key$,
            });
   }
   deleteData( key$:string ){
      this.flightlist.remove(key$);
   }

}
