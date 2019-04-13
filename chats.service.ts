import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../interface/mensaje.interface';
import { AuthService } from '../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

   private itemsCollection: AngularFirestoreCollection<Mensaje>;
   public chats:Mensaje[] = [];
   public usuario: any={};
  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) { }

   cargarMensajes(){
      this.itemsCollection = this.afs.collection<Mensaje>('flightschat',ref => ref.orderBy('fecha','desc')
                                                                                  .limit(8));
      return this.itemsCollection.valueChanges()
                           .map((mensajes:Mensaje[])=>{
                              console.log(mensajes);
                              this.chats = mensajes;
                              //this.chats = [];

                              //for (let mensaje of mensajes ){
                              //   this.chats.unshift(mensaje);
                              //}
                              //return this.chats;
                           })
   }
   enviarUsuario(){
      //console.log('envio usuario');
      this.afAuth.authState.subscribe( user =>{
         //console.log(user.email);
         //console.log(user.uid);
         if(!user){
            return
         }
         this.usuario.nombre=user.email;
         this.usuario.uid=user.uid;
         //console.log(this.usuario);
         //return this.usuario
      })
   }
   agregarMensaje(texto:string){
      let mensaje:Mensaje={
         nombre:this.usuario.nombre,
         mensaje:texto,
         fecha:new Date().getTime(),
         uid: this.usuario.uid
      }
      return this.itemsCollection.add(mensaje);
   }
}
