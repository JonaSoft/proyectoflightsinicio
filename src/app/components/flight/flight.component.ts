import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../servicios/data.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})

export class FlightComponent {

      flight:any ={};
      nombreFile:any ={};
      cadena:string

  constructor(private activateRoute: ActivatedRoute,
              private _dataService: DataService){
      this.activateRoute.params.subscribe(params=>{
         //console.log(params['id']);
         //this.flight = this._dataService.getDataTotal(params['id']);
         //this.cadena=this.flight['market'] + this.flight['flightini'] + this.flight['fechainit'];
                  //console.log(this.flight['market'],this.flight['flightini']);
         console.log(this.cadena)
         console.log('Hola3');
      })

  }

}
