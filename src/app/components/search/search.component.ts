import { Component, OnInit } from '@angular/core';
import { DataService, Dato } from '../../servicios/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
//import * as fs from "../../../../file-system/file-system';
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
   loading:boolean
  constructor( //private _dataService:DataService,
               //private activateRoute: ActivatedRoute,
               private _router: Router,
               private http: HttpClient)
              // private fs:File)
               {
                   this.loading=false
                   console.log("loading falso")
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

   activar(){
      this.mostrarv=false;
      this.mostrar= true;
      this.tarjetas=true;
   }

   vertodo(){
      this.mostrarv= true;
   }
   buscavuelo(termino:string, termino1:string){
       console.log('Constructor de llamado listo activo loading');
            this.loading = true;
            this.mostrar=false;
            this.aviso=false;
            //this.http.get('https://restcountries.eu/rest/v2/lang/es')
               this.http.get('../assets/datajson.json')

                     .subscribe((datajson:any) =>{
                        this.datos=datajson
                        console.log("desactivado loading");
                        this.flightArr=[ ] ;
                        termino=termino.toUpperCase();
                        termino1=termino1.toUpperCase();
                        for ( let mcar of this.datos){

                           if(mcar.market.trim() == termino ){
                              if(mcar.codope.trim() == termino1 ){

                                 this.flightArr.push(mcar);
                              }else{
                                 if(termino1 == ""){
                                     this.flightArr.push(mcar);

                                 }
                              }
                               this.loading = false;
                               this.aviso=false;
                               this.mostrar=true


                           }else{

                                 this.mostrar=false;
                                 this.aviso = true;
                           }
                        }

                        if (this.flightArr.length==0){
                                this.mostrar=false;
                                 this.aviso = true
                        }else{
                                 this.mostrar=true;
                                 this.aviso=false
                        }
                        this.loading = false;
                        return this.flightArr
                     })
   }
    ocultar(){
        this.mostrar=false
    }
   abrirfile(i){
        console.log(i.fechainit)
        //console.log(this.i])
        this.dia = i.fechainit.substring(0,2)
        console.log(this.dia)
        this.mes = i.fechainit.substring(3,5);
        this.anio = i.fechainit.substring(6,10);
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
         this.cadena=(i.market+i.flightini+this.dia+this.mes+this.anio);
         console.log(i.market + i.flightini);
         console.log(this.cadena)

         //if (this.fs.accessSync("assets/2019/"+this.cadena)){
         //   console.log('lo abrio');
            window.open("assets/2019/"+this.cadena,"nuevo",
            "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=500")

         //}else{
         //   console.log('no lo encontro');
         //   this._router.navigate(['notfound'])

         //}

   }
}
