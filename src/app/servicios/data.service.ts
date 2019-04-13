import { Injectable } from '@angular/core';
<<<<<<< HEAD
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
   flightsUrl:string = "https://flights-4a6e1.firebaseio.com/flights.json";
   flightUrl:string = "https://flights-4a6e1.firebaseio.com/flights";
   dia:string;
   mes:string;
   anio:string;
   public cadena:any

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
       //console.log(nodo);
       return this.http.post( nodo, body, { headers } )
       .map(res=>{
         console.log(res);
         return res
       })

   }
   updateFlight(datos:any,flight:string,key$:Dato){
       console.log(datos, flight, key$)
       let union:any=[];
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
      console.log(url);
      console.log(textofinal);
       return this.http.put( url, textofinal, { headers } )
       .map(res=>{
         //console.log(res);
         return res
      })
   }


   getFlightiniMarket(_flightini:string,_market:string){
         // market y numero de vuelo market
            console.log('market y flightini');
            return this.http.get(this.flightUrl+'/'+_flightini+'.json')
            .map( res=>res);
   }
   getMarketOperador(_market:string,_codope:string){
         // market y numero de vuelo market
           //console.log('market y operador');
            //console.log(_market );
            //console.log(_codope );
           return this.http.get(this.flightsUrl)
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
   deleteData(){
   }
   obtenerCadena(clientes:any){
      //console.log(clientes);
      this.dia = clientes.fechainit.substring(0,2);
      this.mes = clientes.fechainit.substring(3,5);
      this.anio = clientes.fechainit.substring(6,10);
      switch (this.mes) {
         case "01":
            this.mes="JAN";
            break;
         case "02":
            this.mes="FEB";
            break;
         case "03":
            this.mes="MAR";
            break;
         case "04":
            this.mes="APR";
            break;
         case "05":
            this.mes="MAY";
            break;
         case "06":
            this.mes="JUN";
            break;
         case "07":
            this.mes="JUL";
            break;
         case "08":
            this.mes="AUG";
            break;
         case "09":
            this.mes="SEP";
            break;
         case "10":
            this.mes="OCT";
            break;
         case "11":
            this.mes="NOV";
            break;
         case "12":
            this.mes="DEC";
            break;
         default:
      }
      this.cadena=`../../assets/2019/${clientes.market}${clientes.flightini}${this.dia}${this.mes}${this.anio}.txt`;
      //this.cadena=`c:/users/public/vfdata/imagen/2019/${clientes.market}${clientes.flightini}${this.dia}${this.mes}${this.anio}.txt`;
      //let nodo =  `${ this.flightUrl }/${ valor }.json`
      return(this.cadena)




   }

}
=======

@Injectable()
export class DataService {
   private datos:Dato[] = [

   {

      cliente:"QF5504DRWADL21/01/2019_21/01/2019",
      market:"QF",
      flightini:"5504",
      flightend:"5504",
      origen:"DRW",
      destino:"ADL",
      numope:"",
      codope:"JQ",
      fechainit:"21/01/2019",
      fechaend:"21/01/2019",
      frecuencia:" MO",
      clase:"DRW0630MOYBHKMLVSNQO/G3203:40ADL1110MO3:40COMMENTS-1DRWADL-COMMERCIALDUPLICATE-OPERATEDBYJETSTAR2ENTIREFLT-W/INTERNATLCONNECTINGORSTOPOVERTRAFFICONLY3DRWADL-OPE",
      comentario:"ADL@COMMERCIALDUPLICATE@OPERATEDBYJETSTAR2ENTIREFLT@W/INTERNATLCONNECTINGORSTOPOVERTRAFFICONLY3DRWADL@O",
      flightope:"0084",
      timedep:" 0630 ",
      timearr:" 1110",
      fechareg: '12/02/2019'
   }


   ]
   //private flightArr:Dato[]

  constructor() {
      console.log("Servicio Listo para CodeShare");
   }

   getdata():Dato[]{
      return this.datos;
   }
   getFlight(idx:number){
      console.log(this.datos[idx]);
      return(this.datos[idx])
   }
   buscarflight(termino:string):Dato[]{

      let flightArr : Dato[] = [];

      for ( let mcar of this.datos){
         let vuelo = mcar.market;
         if(vuelo.indexOf( termino ) >= 0 ){
            flightArr.push(mcar)
         }
          console.log(flightArr);
      }

      return flightArr;
   }
}
 export interface Dato{
       cliente:string;
       market:string;
       flightini:string;
       flightend:string;
       origen:string;
       destino:string;
       numope:string;
       codope:string;
       fechainit:string;
       fechaend:string;
       frecuencia:string;
       clase:string;
       comentario:string;
       flightope:string;
       timedep:string;
       timearr:string;
       fechareg:string;

 };
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
