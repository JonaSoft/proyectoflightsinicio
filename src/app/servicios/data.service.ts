import { Injectable } from '@angular/core';

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
