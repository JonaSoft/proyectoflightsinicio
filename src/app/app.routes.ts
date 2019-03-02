import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {MantenaiceComponent} from './components/mantenaice/mantenaice.component';
import {SearchComponent} from './components/search/search.component';
import {LoginComponent} from './components/login/login.component';
import { NotfoundComponent} from './components/notfound/notfound.component'
import { AuthGuard } from './guards/auth.guard'

const APP_ROUTES: Routes = [
		{path:'home', component:HomeComponent, canActivate: [AuthGuard]},
		{path:'mantenaice', component:MantenaiceComponent, canActivate: [AuthGuard]},
		{path:'search', component:SearchComponent, canActivate: [AuthGuard]},
		{path:'login', component:LoginComponent},
		{path:'notfound', component:NotfoundComponent,  canActivate: [AuthGuard]},
		//{path:'flight/:id', component:NotfoundComponent},

		{path:'**', pathMatch:'full', redirectTo:'notfound' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});
