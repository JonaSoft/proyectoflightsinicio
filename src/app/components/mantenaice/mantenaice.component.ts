import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../servicios/data.service';
import { Dato } from "../../interface/data.interface";
import { FileItem } from "../../models/file-item";
import { CargaimagenService } from '../../servicios/cargaimagen.service'


@Component({
  selector: 'app-mantenaice',
  templateUrl: './mantenaice.component.html',
  styleUrls: ['./mantenaice.component.css']
})
export class MantenaiceComponent implements OnInit {
   datos=[];
   flightExport=[];
   estaSobreElemento=false;
   archivos: FileItem[]=[];
   //flightnodo:string;
  constructor(private router:Router,
              private http:HttpClient,
              private _dataService1:DataService,
              private adicionakey:DataService,
              public _cargaImagenes:CargaimagenService) { }

  ngOnInit() {
  }
   newflight(){
       this.router.navigate(['mantenaice/newflight'])
   }
   volver(){
      console.log('regresar')
   }
   exportar(){
      console.log('Iniciar exportacion')
      this.http.get('../../../assets/importjson.json')
            .subscribe((datajson:any) =>{
               this.datos=datajson;
               //console.log(this.datos[0]);
               for ( let itemexport of this.datos){
                     let flightnodo=itemexport.flightini;
                     this._dataService1.newFlight(itemexport,flightnodo)
                        .subscribe(data=>{
                         console.log(flightnodo,data);
                         let clave:any = data
                           this.adicionakey.updateFlight(itemexport,flightnodo,clave)
                           .subscribe(envio=>{
                             console.log("importado"+itemexport.market+flightnodo)
                           })
                        })

               }
                  console.log("Exportación Finalizada1 ")
            })
       //console.log("Exportación Finalizada ")
   }
   cargarImagenes(){
      this._cargaImagenes.cargarImagenesFirebase(this.archivos);
   }
   pruebaSobreElemento(event){
      console.log(event);
   }
}
