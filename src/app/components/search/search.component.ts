import { Component, OnInit } from '@angular/core';
import { DataService, Dato } from '../../servicios/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

   datos:Dato[]=[];
   flightArr : Dato[] ;
   mostrar = false;
   mostrarv = false;
   tarjetas= true;
   aviso = false;
   cadena;cliente;market;flightini;origen;destino;codope;frecuencia;clase : string;
   comentario;timedep;timearr :string;
   flight:any ={};
   dia;mes;anio:string;
   acum:number;

  constructor( //private _dataService:DataService,
               //private activateRoute: ActivatedRoute,
               private _router: Router,
               private http: HttpClient) {
            console.log('Constructor de llamado listo');
            //this.http.get('https://restcountries.eu/rest/v2/lang/es')
               this.http.get('../assets/datajson.json')
                     .subscribe((datajson:any) =>{
                        //console.log(datajson);

                        //console.log(datajson[1])
                        this.datos=datajson
                        //console.log(datajson)
                        console.log(this.datos)

                     })

  }

  ngOnInit() {
      //this.datos = this._dataService.getdata();
      this.flightArr = [];
      //console.log('Hola1');
      //console.log(this.datos['cliente']);
      //console.log('Hola2')
  }
   verFlight( idx:number){
      this._router.navigate(['/flight',idx])
   }
   seeFlight(i:number){

      this.dia = this.flightArr[i].fechainit.substring(0,2)
      this.mes = this.flightArr[i].fechainit.substring(3,5);
      this.anio = this.flightArr[i].fechainit.substring(6,10);
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
      this.cadena=(this.flightArr[i].market+this.flightArr[i].flightini+this.dia+this.mes+this.anio+`.txt`);
      this.cliente=this.flightArr[i].cliente;
      this.market=this.flightArr[i].market;
      this.flightini=this.flightArr[i].flightini;
      this.origen=this.flightArr[i].origen;
      this.destino=this.flightArr[i].destino;
      this.codope=this.flightArr[i].codope;
      this.frecuencia=this.flightArr[i].frecuencia;
      this.clase=this.flightArr[i].clase;
      this.comentario=this.flightArr[i].comentario;
      this.timedep=this.flightArr[i].timedep;
      this.timearr=this.flightArr[i].timearr;
      //console.log(this.cadena);
      //console.log(this.datos);
      //console.log(i);
      console.log(this.flightArr[i]);
      this.mostrarv=true;
      this.mostrar= true;
      this.tarjetas=false;
      //this.mostrarv=
      //return this.datos[i];



   }
   activar(){
      this.mostrarv=false;
      this.mostrar= true;
      this.tarjetas=true;
   }
   //document.getElementById('see').MM_openBrWindow(this.cadena,'','width=850,height=700')
   vertodo(){
      this.mostrarv= true;
   }
   buscavuelo(termino:string, termino1:string){
     this.flightArr=[ ] ;
      termino=termino.toUpperCase();
      termino1=termino1.toUpperCase();

      console.log(this.datos);
      //console.log(this.flightArr);
      for ( let mcar of this.datos){
         //console.log(mcar.market.trim());
        //console.log(termino)
         if(mcar.market.trim() == termino ){
            if(mcar.codope.trim() == termino1 ){
              // console.log( mcar.market.trim());
               //console.log( mcar.codope.trim());
               this.flightArr.push(mcar);
            }else{
               if(termino1 == ""){
                   this.flightArr.push(mcar);

               }
            }
            //console.log(vuelo.indexOf( termino ))
            //console.log( mcar.market.trim());
            //this.flightArr.push(mcar);
            //console.log(this.flightArr.length);
            //console.log('es mayor que cero');
             this.aviso=false;
             this.mostrar=true

         }else{

               this.mostrar=false;
               //this.mostrar= !this.mostrar;
               this.aviso = true;
               //console.log(this.acum);
               //console.log('es cero')

         }
                   //return this.flightArr;
            //console.log(vuelo);
      }
       //console.log(this.flightArr);
      if (this.flightArr.length==0){
              this.mostrar=false;
               this.aviso = true
      }else{
               this.mostrar=true;
               this.aviso=false
      }

      return this.flightArr


   }
    ocultar(){
        this.mostrar=false
    }
   abrirfile(i){
        this.dia = this.datos[i].fechainit.substring(0,2)
        this.mes = this.datos[i].fechainit.substring(3,5);
        this.anio = this.datos[i].fechainit.substring(6,10);
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
         this.cadena=(this.datos[i].market+this.datos[i].flightini+this.dia+this.mes+this.anio+`.txt`);
         console.log(this.datos[i].market + this.datos[i].flightini);
         console.log(this.cadena)
         window.open("../assets/2019/"+this.cadena+"","nuevo",
         "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=900, height=500");
        //window.open("https://drive.google.com/file/d/1suf2lIzpOsWU-vG5envzbb-lkm8q-DXE/view?usp=sharing",
         //"directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=900, height=500");
   }

}
