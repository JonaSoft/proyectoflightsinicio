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
   loading:boolean
  constructor( //private _dataService:DataService,
               //private activateRoute: ActivatedRoute,
               private _router: Router,
               private http: HttpClient) {
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
       console.log('Constructor de llamado listo activo loading');
            this.loading = true;
            this.mostrar=false;
            this.aviso=false;
            //this.http.get('https://restcountries.eu/rest/v2/lang/es')
               this.http.get('../assets/datajson.json')
               
                     .subscribe((datajson:any) =>{
                        //console.log(datajson);

                        //console.log(datajson[1])
                        this.datos=datajson
                        console.log("desactivado loading");
                        
                        //console.log(this.datos)
                       
                    


     this.flightArr=[ ] ;
      termino=termino.toUpperCase();
      termino1=termino1.toUpperCase();

      console.log(this.datos);
     
      
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
        
            window.open("assets/2019/"+this.cadena,"nuevo",
            "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=900, height=500")
         
         //else{
         //   this._router.navigate(['notfound'])
         // }
        //window.open("https://drive.google.com/file/d/1suf2lIzpOsWU-vG5envzbb-lkm8q-DXE/view?usp=sharing",
         //"directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=900, height=500");
   }

}
