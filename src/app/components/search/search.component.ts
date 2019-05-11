import { Component, OnInit, ViewChild } from '@angular/core';
import { Dato } from '../../interface/data.interface'
import { DataService } from '../../servicios/data.service';
import { ChatsService } from '../../servicios/chats.service';
import { AuthService } from '../../servicios/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
//***************fire database**********
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
//**************************************************************************
import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import {ScrollingModule} from '@angular/cdk/scrolling';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
   public items: Observable<any[]>;
   datos: Dato[];
   flightArr: Dato[]=[];
   flightPrevio: Dato[]=[];
   flightFinal: Dato[]=[];
   //personas = Array(500).fill(0);
   view=true;
   hide=false;
   mostrar=false;
   aviso=false;
   loading:boolean=false;
   mensaje:string="";
   dia:string;
   mes:string;
   anio:string;
   //public items: Observable<any[]>;
   _flightini:number;
   _market:string;
   _codope:string;
   _flightope:number;
   _origen:string;
   _destino:string;
   forma:FormGroup;
   formFlight:Object = {
        market:"",
        flightini:"",
        codope:"",
        flightope:"",
        origen:"",
        destino:""
   }

  constructor( private _dataService:DataService,
               private _cs: ChatsService,
               private db: AngularFirestore,
               public afAuth: ChatsService,

               private router:Router){
                this.forma = new FormGroup({
                   'market':new FormControl(''),
                   'flightini':new FormControl(''),
                   'codope':new FormControl(''),
                   'flightope':new FormControl(''),
                   'origen':new FormControl(''),
                   'destino':new FormControl('')
                })

                  this.items = db.collection('flightschat').valueChanges();
                  this._cs.cargarMensajes()
                  .subscribe();
                  this.afAuth.enviarUsuario();
                  console.log(this.afAuth);


               }
   ngOnInit(){
      //console.log(this.personas)
   }

    enviarform(){
      console.log(this.forma);
      //this.forma.disabled["true"];
      //console.log(this.forma.disabled);
      //this.forma.setValue(this.formFlight)
      this.loading = true;
      this._flightini = this.forma.value.flightini;
      this._market = this.forma.value.market.toUpperCase();
      this._codope = this.forma.value.codope.toUpperCase();
      this._flightope= this.forma.value.flightope;
      this._origen = this.forma.value.origen.toUpperCase();
      this._destino = this.forma.value.destino.toUpperCase();

      console.log(this._market);
      //console.log(this._codope);
       //MARKETERO Y FLIGHTINI
       console.log(this._flightini )
      if(this._flightini>0 &&this._market.length>0 && this._codope.length<1 && this._flightope<1 && this._origen.length<1 && this._destino.length<1){
         console.log(this._flightini )
         this._dataService.getFlightiniMarket(this._flightini,this._market)
         .subscribe(data =>{
            //console.log(data);

            for(let z in data){
               //console.log(data[z].market);
               if(data[z].market==this._market){
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
              this.flightFinal.reverse();
              this.aviso = false;
              this.mostrar = true;

            }
         })
      }
      // MARKETERO Y CODE OPERADOR
      if(this._flightini<1 &&this._market.length>0 && this._codope.length>0 && this._flightope<1 && this._origen.length<1 && this._destino.length<1){
         this._dataService.getMarketOperador(this._market,this._codope)
            .subscribe(data=>{
                for(let z in data){
                  console.log(data[z]);
                  for(let x in data[z]){
                    if(data[z][x].market==this._market && data[z][x].codope==this._codope){
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
                   //this.flightFinal.reverse();
                   this.flightFinal.reverse();
                   //console.log('flightFinal lleno');
                   this.aviso = false;
                   this.mostrar = true;

                 }
                //console.log(this.flightFinal.reverse())
            })
         }
      //SOLO MARKETERO
      if(this._flightini<1 &&this._market.length>0 && this._codope.length<1 && this._flightope<1 && this._origen.length<1 && this._destino.length<1){
         this._dataService.getMarket(this._market)
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data.length);
                  for(let x in data[z]){
                     if(data[z][x].market==this._market){
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
                //console.log(this.flightFinal.sort());
                this.flightFinal.reverse();
                this.aviso = false;
                this.mostrar = true;

             }
         })
      }

      if(this._flightini<1 &&this._market.length<1 && this._codope.length>0 && this._flightope>0 && this._origen.length<1 && this._destino.length<1){
         console.log(this._flightope)
         this._dataService.getOperadorFlightOpe(this._codope,this._flightope)
         .subscribe(data =>{
            //console.log(data);

            for(let z in data){
               //console.log(data[z].market);
               if(data[z].codope==this._codope){
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
              this.flightFinal.reverse();
              this.aviso = false;
              this.mostrar = true;

            }
         })
      }

      //SOLO ORIGEN
       if(this._flightini<1 &&this._market.length<1 && this._codope.length<1 && this._flightope<1 && this._origen.length>0 && this._destino.length<1){
         this._dataService.getMarket(this._origen)
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data.length);
                  for(let x in data[z]){
                     if(data[z][x].origen==this._origen){
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
                this.flightFinal.reverse();
                this.aviso = false;
                this.mostrar = true;

             }
         })
      }
      //SOLO DESTINO
      if(this._flightini<1 &&this._market.length<1 && this._codope.length<1 && this._flightope<1 && this._origen.length<1 && this._destino.length>0){
         this._dataService.getMarket(this._destino)
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data.length);
                  for(let x in data[z]){
                     if(data[z][x].destino==this._destino){
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
                this.flightFinal.reverse();
                this.aviso = false;
                this.mostrar = true;

             }
         })
      }
      //ORIGEN Y DESTINO
      if(this._flightini<1 &&this._market.length<1 && this._codope.length<1 && this._flightope<1 && this._origen.length>0 && this._destino.length>0){
         this._dataService.getMarket(this._destino)
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data.length);
                  for(let x in data[z]){
                     if(data[z][x].origen==this._origen && data[z][x].destino==this._destino){
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
                this.flightFinal.reverse();
                this.aviso = false;
                this.mostrar = true;

             }
         })
      }
      //SOLO CODIGO OPERADOR
      if(this._flightini<1 &&this._market.length<1 && this._codope.length>0  && this._flightope<1 && this._origen.length<1 && this._destino.length<1){
         this._dataService.getOperator(this._codope)
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data[z]);
                  for(let x in data[z]){
                    if(data[z][x].codope==this._codope){
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
                this.flightFinal.reverse();
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
               this.flightArr.reverse();
               this.aviso = false;
               this.mostrar = true;
            }
         })
      }
      //SOLO FLIGHT OPERADOR
      if(this._flightini<1 &&this._market.length<1 && this._codope.length<1 && this._flightope>0 && this._origen.length<1 && this._destino.length<1){
          console.log("busca flightope")
          //this.aviso=false;
          this._dataService.getFlightOperator(this._flightope)
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data[z]);
                  for(let x in data[z]){
                     if(data[z][x].flightope==this._flightope){
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
               //console.log("this.flightFinal.length<1")
                console.log(this.flightFinal.length);
                console.log('flightFinal vacio');
                this.aviso=true;
                this.mostrar=false;
                //data=[]
            }else{
                console.log(this.flightFinal.length);
                console.log('flightFinal lleno');
                this.flightFinal.reverse();
                this.aviso = false;
                this.mostrar = true;

            }
         })

      }
      //SOLO OPERADOR Y FLIGHT OPERADOR
      if(this._flightini<1 &&this._market.length<1 && this._codope.length>0 && this._flightope>0 && this._origen.length<1 && this._destino.length<1){
          console.log("busca operador y flightope")
          //this.aviso=false;
          this._dataService.getOperatorFlightOperator()
         .subscribe(data =>{
               //console.log(data);
               for(let z in data){
                  //console.log(data[z]);
                  for(let x in data[z]){
                     if(data[z][x].codope==this._codope && data[z][x].flightope==this._flightope){
                        console.log(this._codope);
                        console.log(data[z][x].codope);
                        console.log(this._flightope);
                        console.log(data[z][x].flightope);
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
               //console.log("this.flightFinal.length<1")
                console.log(this.flightFinal.length);
                console.log('flightFinal vacio');
                this.aviso=true;
                this.mostrar=false;
                //data=[]
            }else{
                console.log(this.flightFinal.length);
                console.log('flightFinal lleno');
                this.flightFinal.reverse();
                this.aviso = false;
                this.mostrar = true;

            }
         })

      }
      //SOLO FLIGHT MARKETERO
      if(this._flightini>0 &&this._market.length<1 && this._codope.length<1 && this._origen.length<1 && this._destino.length<1){
         this._dataService.getFlight(this._flightini)
         .subscribe(data =>{
            for(let z in data){
               this.flightFinal.push(data[z]);
               //this.flightFinal.sort()
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
               this.flightFinal.sort();
               //this.flightFinal.orderByString('origen');
               this.aviso = false;
               this.mostrar = true;
            }
         })
      }
      if(this._flightini<1 &&this._market.length<1 && this._codope.length<1 && this._origen.length<1 && this._destino.length<1){
          this.aviso = true;
          this.loading = false;
          this.view=false;
          this.hide=true
      }

   }

   closeTable(forma:NgForm){
      this.hide = false;
      this.view = true;
      this.mostrar = false;
      this.aviso = false;
      this.flightArr = [ ];
      this.flightFinal = [ ];
      this._market = "";
      this._flightini=0;
      this._codope="";
      this._flightope=0;
      this._origen="";
      this._destino="";
      //this.router.navigate['search'];
      this.forma.reset({
           market:"",
           flightini:"",
           codope:"",
           flightope:"",
           origen:"",
           destino:""
         }
      )
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
