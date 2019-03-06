import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AngularFireModule} from  '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
//import { FirebaseFunctions} from '@angular/fire';
import { environment } from '../environments/environment'



//Rutas
import { APP_ROUTING } from './app.routes';

//Servicios

import {DataService} from './servicios/data.service';
import {AuthService} from './servicios/auth.service';

//Guards

import { AuthGuard} from './guards/auth.guard'

//componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { MantenaiceComponent } from './components/mantenaice/mantenaice.component';
import { FlightComponent } from './components/flight/flight.component';
import { HttpClientModule } from '@angular/common/http';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoadingComponent } from './components/loading/loading.component'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    FooterComponent,
    MantenaiceComponent,
    FlightComponent,
    NotfoundComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
   DataService,
   AuthService,
   AuthGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
