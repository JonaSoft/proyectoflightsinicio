import { Component, OnInit } from '@angular/core';
import { Dato } from '../../../../interface/data.interface';
import { DataService } from '../../../../servicios/data.service';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-newflight',
  templateUrl: './newflight.component.html',
  styleUrls: ['./newflight.component.css']
})
export class NewflightComponent implements OnInit {
   forma:FormGroup;
   nuevo: boolean =false;
   id:string;
  constructor( private _dataService:DataService,
               private adicionakey:DataService,
               private router:Router,
               private activateRoute:ActivatedRoute,
               //private x:string
               //private datos: Dato[]
               ) {
               this.forma= new FormGroup({

               })
               this.activateRoute.params
                  .subscribe(parametros=>this.id=parametros['name']);
               }

  ngOnInit() {
  }
   volver(){
      this.router.navigate(['/mantenaice'])
   }
   newFlight(forma:NgForm){
      console.log('debe leer this.datos')
      //this.valor=forma.value.flightini
      console.log(forma.value);
      let datos=forma.value;
      let flightini=(forma.value.flightini);
      //x=JSON.parse(x);
      //console.log(x['flightini']);
      console.log(flightini)
      this._dataService.newFlight(forma.value,flightini)
         .subscribe(data=>{
              console.log(datos) ;
              console.log(data['name']);
              console.log(flightini);
              let clave:any = data
               this.adicionakey.updateFlight(forma.value,flightini,clave)
                .subscribe(envio=>{
                  console.log(envio)
                 })
              //this.router.navigate(['/mantenaice',(data['name'])])
      })
   }
   updatemasivo(){
//"key$","key$"

   }


}
