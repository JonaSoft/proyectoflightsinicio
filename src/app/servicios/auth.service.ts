import { Injectable } from '@angular/core';
//import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
//import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
  public usuario: any={};
=======

>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
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
<<<<<<< HEAD
         .then( userData => {resolve(userData);
                             //console.log(userData.user.email)
                            },
=======
         .then( userData => resolve(userData),
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
          err => reject (err));
      });
   }



<<<<<<< HEAD

=======
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
   logoutAuth(){
      return this.afAuth.auth.signOut();
   }
}
