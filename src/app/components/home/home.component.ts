import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private _activatedRoute:ActivatedRoute) {
    this._activatedRoute.params.subscribe( params => {
      //this.startCarousel();
    })
   }
  startCarousel(){
    $('.myCarousel').carousel();
  }
  ngOnInit() {
    //this.startCarousel();
  }

}
