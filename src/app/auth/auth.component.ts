import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoggedIn = true ; 
  isLoading = false;

  constructor(private authservice:AuthService){}

  switchMode(){
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }; 

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if(this.isLoggedIn){
      //...
    }else{
      this.authservice.signup(email,password).subscribe(
        res =>{
          console.log(res);
          this.isLoading = false;
        },
        error =>{
          console.log(error);
          this.isLoading = false;
        }
        );
    }
    form.reset();
  }
}
