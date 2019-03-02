import { Injectable } from '@angular/core';
//import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
//import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      public afAuth: AngularFireAuth
   ) { }
   registerUser(email: string, pass:string){
      return new Promise((resolve,reject) => {
         this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
         .then( userData => resolve(userData),
          err => reject (err));
      });
   }

   loginAuth(email: string, pass:string){
      return new Promise((resolve,reject) => {
         this.afAuth.auth.signInWithEmailAndPassword(email,pass)
         .then( userData => resolve(userData),
          err => reject (err));
      });
   }



   logoutAuth(){
      return this.afAuth.auth.signOut();
   }
}
