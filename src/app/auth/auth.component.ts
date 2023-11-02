import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AusthResponseData, AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoggedIn = true ; 
  isLoading = false;
  error:string = null;

  constructor(private authservice:AuthService,
    private router:Router){}

  switchMode(){
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }; 

    const email = form.value.email;
    const password = form.value.password;
    let authObservable:Observable<AusthResponseData>;

    this.isLoading = true;

    if(this.isLoggedIn){
      authObservable = this.authservice.login(email,password);
    }else{
      authObservable = this.authservice.signup(email,password);
    }

    authObservable.subscribe(
      res =>{
        console.log(res);
        this.isLoading = false;
        this.router.navigate(["/home"]);
      },
      errMsg =>{
        console.log(errMsg);
        this.error = errMsg;
        this.isLoading = false;
      }
      );
    form.reset();
  }
}
