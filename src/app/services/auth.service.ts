import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


export interface AusthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;


  constructor(private http:HttpClient,
    private router:Router) { }

  signup(email: string , password : string){
    return this.http.post<AusthResponseData>(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseApiKey,
    { email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError) , tap(resData =>{
      this.handleAuth(resData.email, resData.localId , resData.idToken , +resData.expiresIn)
    }));
  }

  login(email: string , password : string){
    return this.http.post<AusthResponseData>
    ("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseApiKey,
    { email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError) ,tap(resData =>{
      this.handleAuth(resData.email, resData.localId , resData.idToken , +resData.expiresIn)
    }));

  }
    private handleAuth(email:string ,userId:string, token:string , expiresIn:number){
      const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
      const user = new User(email , userId ,token , expirationDate);

      this.user.next(user);
      this.autoLogout(expiresIn * 1000)
      localStorage.setItem('userData' , JSON.stringify(user));
    }



   private handleError(errRes : HttpErrorResponse){
      let errorMessage = "An unknown error occured";
      if(!errRes.error || !errRes.error.error){
        return throwError(errorMessage);
      }
      console.log(errRes.error.error.message);
      
      switch(errRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = "This email already exists !";
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = "The email or password is Incorrect, Try Again !";
          break;
      }

      return throwError(errorMessage);
   }

   logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
   }
   //this function check that tha user is already loggedin or not, as we reload the page manually
   autoLogin(){
    
    const userData:{
      email:string;
      id:string;
      _token:string;
      _tokenExpirationDate:string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    
    const loadedUser = new User(userData.email, userData.id , userData._token , new Date(userData._tokenExpirationDate));

    if(loadedUser){
      this.user.next(loadedUser);
      const expirationDura = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDura);
    }
   }

   autoLogout(expirationDuration:number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
   }
}
