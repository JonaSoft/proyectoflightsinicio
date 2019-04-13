<<<<<<< HEAD
import { Component, OnInit, ViewChild } from '@angular/core';
import { Dato } from '../../interface/data.interface'
import { DataService } from '../../servicios/data.service';
import { ChatsService } from '../../servicios/chats.service';
import { AuthService } from '../../servicios/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
//***************fire database**********
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
//**************************************************************************
import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

=======
import { Component, OnInit } from '@angular/core';
import { DataService, Dato } from '../../servicios/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
//import * as fs from "../../../../file-system/file-system';
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
<<<<<<< HEAD
export class SearchComponent {
   public items: Observable<any[]>;
   datos: Dato[];
   flightArr: Dato[]=[];
   flightPrevio: Dato[]=[];
   flightFinal: Dato[]=[];
   view=true;
   hide=false;
   mostrar=false;
   aviso=false;
   loading:boolean=false;
   mensaje:string="";
   dia:string;
   mes:string;
   anio:string
   //public items: Observable<any[]>;

  constructor( private _dataService:DataService,
               private _cs: ChatsService,
               private db: AngularFirestore,
               public afAuth: ChatsService,

               private router:Router){
                  this.items = db.collection('flightschat').valueChanges();
                  this._cs.cargarMensajes()
                  .subscribe();
                  this.afAuth.enviarUsuario();
                  console.log(this.afAuth)

               }

    buscavuelo(forma:NgForm):void{

      this.loading = true;
      let _flightini = forma.value.flightini,
          _market = forma.value.market,
          _codope = forma.value.codope,
          _flightope= forma.value.flightope,
          _origen = forma.value.origen,
          _destino = forma.value.destino;
      //MARKETERO Y FLIGHTINI
      if(_flightini.length>0 &&_market.length>0 && _codope.length<1 && _flightope.length<1 && _origen.length<1 && _destino.length<1){
         this._dataService.getFlightiniMarket(_flightini,_market)
         .subscribe(data =>{
            //console.log(data);

            for(let z in data){
               //console.log(data[z].market);
               if(data[z].market==_market){
                  this.flightFinal.push(data[z])
               }
            }
            this.loading = false;
            //this.mostrar = true;
            this.view=false;
            this.hide=true;
            if (this.flightFinal.length<1){
              //console.log(this.flightFinal.length);
              //onsole.log('flightFinal vacio');
              this.aviso=true;
              this.mostrar=false;
              //data=[]
            }else{
              //console.log(this.flightFinal.length);
              //console.log('flightFinal lleno');
              this.aviso = false;
              this.mostrar = true;

            }
         })
      }
      // MARKETERO Y CODE OPERADOR
      if(_flightini.length<1 &&_market.length>0 && _codope.length>0 && _flightope.length<1 && _origen.length<1 && _destino.length<1){
         this._dataService.getMarketOperador(_market,_codope)
            .subscribe(data=>{
                for(let z in data){
                  //console.log(data[z]);
                  for(let x in data[z]){
                    if(data[z][x].market==_market && data[z][x].codope==_codope){
                        this.flightFinal.push(data[z][x])
                    }
                  }
               }

                 this.loading = false;
                 //this.mostrar = true;
                 this.view=false;
                 this.hide=true;
                 if (this.flightFinal.length<1){
                   //console.log(this.flightFinal.length);
                   //console.log('flightFinal vacio');
                   this.aviso=true;
                   this.mostrar=false;
                   //data=[]
                 }else{
                   //console.log(this.flightFinal.length);
                   //console.log('flightFinal lleno');
                   this.aviso = false;
                   this.mostrar = true;

                 }
            })
         }
      //SOLO MARKETERO
      if(_flightini.length<1 &&_market.length>0 && _codope.length<1 && _flightope.length<1 && _origen.length<1 && _destino.length<1){
         this._dataService.getMarket(_market)
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data.length);
                  for(let x in data[z]){
                     if(data[z][x].market==_market){
                        this.flightFinal.push(data[z][x]);
                     }
                  }
                      //console.log(this.flightFinal.length);

                  //console.log(this.flightFinal)
               }
             this.loading = false;
             //this.mostrar = true;
             this.view=false;
             this.hide=true;
             if (this.flightFinal.length<1){
                //console.log(this.flightFinal.length);
                //console.log('flightFinal vacio');
                this.aviso=true;
                this.mostrar=false;
                //data=[]
             }else{
                //console.log(this.flightFinal.length);
                //console.log('flightFinal lleno');
                this.aviso = false;
                this.mostrar = true;

             }
         })
      }
      //SOLO ORIGEN
       if(_flightini.length<1 &&_market.length<1 && _codope.length<1 && _flightope.length<1 && _origen.length>0 && _destino.length<1){
         this._dataService.getMarket(_origen)
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data.length);
                  for(let x in data[z]){
                     if(data[z][x].origen==_origen){
                        this.flightFinal.push(data[z][x]);
                     }
                  }
                      //console.log(this.flightFinal.length);

                  //console.log(this.flightFinal)
               }
             this.loading = false;
             //this.mostrar = true;
             this.view=false;
             this.hide=true;
             if (this.flightFinal.length<1){
                //console.log(this.flightFinal.length);
                //console.log('flightFinal vacio');
                this.aviso=true;
                this.mostrar=false;
                //data=[]
             }else{
                //console.log(this.flightFinal.length);
                //console.log('flightFinal lleno');
                this.aviso = false;
                this.mostrar = true;

             }
         })
      }
      //SOLO DESTINO
       if(_flightini.length<1 &&_market.length<1 && _codope.length<1 && _flightope.length<1 && _origen.length<1 && _destino.length>0){
         this._dataService.getMarket(_destino)
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data.length);
                  for(let x in data[z]){
                     if(data[z][x].destino==_destino){
                        this.flightFinal.push(data[z][x]);
                     }
                  }
                      //console.log(this.flightFinal.length);

                  //console.log(this.flightFinal)
               }
             this.loading = false;
             //this.mostrar = true;
             this.view=false;
             this.hide=true;
             if (this.flightFinal.length<1){
                //console.log(this.flightFinal.length);
                //console.log('flightFinal vacio');
                this.aviso=true;
                this.mostrar=false;
                //data=[]
             }else{
                //console.log(this.flightFinal.length);
                //console.log('flightFinal lleno');
                this.aviso = false;
                this.mostrar = true;

             }
         })
      }
      //SOLO CODIGO OPERADOR
      if(_flightini.length<1 &&_market.length<1 && _codope.length>0  && _flightope.length<1 && _origen.length<1 && _destino.length<1){
         this._dataService.getOperator(_codope)
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data[z]);
                  for(let x in data[z]){
                    if(data[z][x].codope==_codope){
                        this.flightFinal.push(data[z][x])
                    }
                  }
                  //console.log(this.flightFinal)
               }
            this.loading = false;
            //this.mostrar = true;
            this.view=false;
            this.hide=true;
            if (this.flightFinal.length<1){
               //console.log(this.flightFinal.length);
               //console.log('flightFinal vacio');
               this.aviso=true;
               this.mostrar=false;
               //data=[]
            }else{
                //console.log(this.flightFinal.length);
                //onsole.log('flightFinal lleno');
                this.aviso = false;
                this.mostrar = true;

            }
            if (this.flightFinal.length<1){
               //console.log(this.flightFinal.length);
               //console.log('flightFinal vacio');
               this.aviso=true;
               this.mostrar=false;
               //data=[]
            }else{
               console.log(this.flightFinal.length);
               console.log('flightFinal lleno');
               this.aviso = false;
               this.mostrar = true;
            }
         })
      }
      //SOLO FLIGHT OPERADOR
      if(_flightini.length<1 &&_market.length<1 && _codope.length<1 && _flightope.length>0 && _origen.length<1 && _destino.length<1){
          //console.log(_flightope)
          this._dataService.getOperator(_flightope)
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data[z]);
                  for(let x in data[z]){
                    if(data[z][x].flightope==_flightope){
                        this.flightFinal.push(data[z][x])
                    }
                  }
                  //console.log(this.flightFinal)
               }
            this.loading = false;
            //this.mostrar = true;
            this.view=false;
            this.hide=true;
            if (this.flightFinal.length<1){
                console.log(this.flightFinal.length);
                console.log('flightFinal vacio');
                this.aviso=true;
                this.mostrar=false;
                //data=[]
            }else{
                console.log(this.flightFinal.length);
                console.log('flightFinal lleno');
                this.aviso = false;
                this.mostrar = true;

            }
         })
      }
      //SOLO FLIGHT MARKETERO
      if(_flightini.length>0 &&_market.length<1 && _codope.length<1 && _origen.length<1 && _destino.length<1){
         this._dataService.getFlight(_flightini)
         .subscribe(data =>{
            for(let z in data){
               this.flightFinal.push(data[z])
            }
            this.loading = false;
            this.view=false;
            this.hide=true;
            if (this.flightFinal.length<1){
               console.log(this.flightFinal.length);
               console.log('flightFinal vacio');
               this.aviso=true;
               this.mostrar=false;
               //data=[]
            }else{
               console.log(this.flightFinal.length);
               console.log('flightFinal lleno');
               this.aviso = false;
               this.mostrar = true;
            }
         })
      }


   }
   closeTable(forma:NgForm){
      this.hide = false;
      this.view = true;
      this.mostrar = false;
      this.aviso = false;
      this.flightArr = [ ];
      this.flightFinal = [ ];
      this.router.navigate['search'];
   }
    //ngForm.formbuscar.reset();
   enviarmensaje(){
         console.log(this.mensaje);
      if(this.mensaje.length===0){
         return
      }
      this._cs.agregarMensaje(this.mensaje)
         .then(()=>this.mensaje="")
         .catch((err)=>console.error('Error al enviar', err));
   }
   //PARA VER TEXTO DE OSCAR
   seeFlight(clientes:any){
      console.log(clientes);
      let res=this._dataService.obtenerCadena(clientes);
      console.log(res);
      window.open(res,"nuevo", "directories=yes, location=yes, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=900, height=500")
   }

=======
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
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
}
