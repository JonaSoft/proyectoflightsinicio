import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../servicios/data.service';
import { Dato } from "../../interface/data.interface"

=======
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15

@Component({
  selector: 'app-mantenaice',
  templateUrl: './mantenaice.component.html',
  styleUrls: ['./mantenaice.component.css']
})
export class MantenaiceComponent implements OnInit {
<<<<<<< HEAD
   datos=[];
   flightExport=[];
   //flightnodo:string;
  constructor(private router:Router,
              private http:HttpClient,
              private _dataService1:DataService,
              private adicionakey:DataService) { }

  ngOnInit() {
  }
   newflight(){
       this.router.navigate(['mantenaice/newflight'])
   }
   volver(){
      console.log('regresar')
   }
   exportar(){
      this.http.get('../../../assets/importjson.json')
            .subscribe((datajson:any) =>{
               this.datos=datajson;
               //console.log(this.datos[0]);
               for ( let itemexport of this.datos){
                     let flightnodo=itemexport.flightini;
                     this._dataService1.newFlight(itemexport,flightnodo)
                        .subscribe(data=>{
                         console.log(data);
                         let clave:any = data
                          this.adicionakey.updateFlight(itemexport,flightnodo,clave)
                           .subscribe(envio=>{
                             console.log(envio)
                           })
                        })
               }
            })
   }
=======

  constructor() { }

  ngOnInit() {
  }

>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
}
