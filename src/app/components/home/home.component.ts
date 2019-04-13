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
<<<<<<< HEAD
      //this.startCarousel();
=======
      this.startCarousel();
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
    })
   }
  startCarousel(){
    $('.myCarousel').carousel();
  }
  ngOnInit() {
<<<<<<< HEAD
    //this.startCarousel();
=======
    this.startCarousel();
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
  }

}
