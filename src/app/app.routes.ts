import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {MantenaiceComponent} from './components/mantenaice/mantenaice.component';
import {SearchComponent} from './components/search/search.component';
import {LoginComponent} from './components/login/login.component'
import {FlightComponent} from './components/flight/flight.component'


const APP_ROUTES: Routes = [
		{path:'home', component:HomeComponent},
		{path:'mantenaice', component:MantenaiceComponent},
		{path:'search', component:SearchComponent},
		{path:'login', component:LoginComponent},
		{path:'flight/:id', component:FlightComponent},
		{path:'**', pathMatch:'full', redirectTo:'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});
