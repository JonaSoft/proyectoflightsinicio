import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
//import { FirebaseFunctions} from '@angular/fire';
import { AngularFireModule} from  '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';


//Rutas
import { APP_ROUTING } from './app.routes';

//Servicios

import {DataService} from './servicios/data.service';
import {AuthService} from './servicios/auth.service';
import {ChatsService} from './servicios/chats.service'

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
import { LoadingComponent } from './components/loading/loading.component';
import { NewflightComponent } from './components/mantenaice/crud/newflight/newflight.component';
import { KeysPipe } from './pipes/keys.pipe';


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
    LoadingComponent,
    NewflightComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
   DataService,
   AuthService,
   AngularFireDatabase,
   AuthGuard,
   ChatsService

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
