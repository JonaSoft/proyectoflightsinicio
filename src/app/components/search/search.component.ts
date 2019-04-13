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

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
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

}
