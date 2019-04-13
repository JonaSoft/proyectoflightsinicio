import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
<<<<<<< HEAD
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
//import { FirebaseFunctions} from '@angular/fire';
import { AngularFireModule} from  '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
=======
import { AngularFireModule} from  '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
//import { FirebaseFunctions} from '@angular/fire';
import { environment } from '../environments/environment'

>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15


//Rutas
import { APP_ROUTING } from './app.routes';

//Servicios

import {DataService} from './servicios/data.service';
import {AuthService} from './servicios/auth.service';
<<<<<<< HEAD
import {ChatsService} from './servicios/chats.service'
=======
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15

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
<<<<<<< HEAD
import { LoadingComponent } from './components/loading/loading.component';
import { NewflightComponent } from './components/mantenaice/crud/newflight/newflight.component';
import { KeysPipe } from './pipes/keys.pipe';
=======
import { LoadingComponent } from './components/loading/loading.component'
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15


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
<<<<<<< HEAD
    LoadingComponent,
    NewflightComponent,
    KeysPipe
=======
    LoadingComponent
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
<<<<<<< HEAD
    AngularFirestoreModule,
=======
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
   DataService,
   AuthService,
<<<<<<< HEAD
   AngularFireDatabase,
   AuthGuard,
   ChatsService

=======
   AuthGuard
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
