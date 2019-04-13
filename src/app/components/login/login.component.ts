import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../servicios/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   public email:string;
   public password:string;
   alerta=false
  constructor(
    private router: Router,
    public _auth: AuthService
   ) { }

  ngOnInit() {
  }
   //login(){
   //     this.router.navigate(['/home'])
   //}
   //logout(){
   //        this.router.navigate(['/notfound'])
   //}
   login(){
      this._auth.loginAuth(this.email,this.password)
      .then((res)=>{
<<<<<<< HEAD
            //console.log(this.email);
            console.log(res);
=======
            console.log(this.email);
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
            //console.log(this.password);
            this.router.navigate(['/home']);
      }).catch((err)=>{
         console.log(err);
         this.alerta=true;
      })
   }
<<<<<<< HEAD
   usuario(){
     console.log('envio usuario')
   }
=======
>>>>>>> a97f4aaa8ac8eef55a83df337e2381fe0962fd15
}
