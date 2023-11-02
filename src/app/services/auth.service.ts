import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../auth/user.model';


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

  constructor(private http:HttpClient) { }

  signup(email: string , password : string){
    return this.http.post<AusthResponseData>(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBthtCpVLbLdFsIynF5ECRvTGl3LfCIBSk",
    { email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError) , tap(resData =>{
      this.handleAuth(resData.email, resData.localId , resData.idToken , +resData.expiresIn)
    }));
  }

  login(email: string , password : string){
    return this.http.post<AusthResponseData>
    ("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBthtCpVLbLdFsIynF5ECRvTGl3LfCIBSk",
    { email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError) ,tap(resData =>{
      this.handleAuth(resData.email, resData.localId , resData.idToken , +resData.expiresIn)
    }));

  }
    private handleAuth(email:string ,userId:string, token:string , exiresIn:number){
      const expirationDate = new Date(new Date().getTime() + exiresIn*1000);
      const user = new User(email , userId ,token , expirationDate);

      this.user.next(user);
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


}
