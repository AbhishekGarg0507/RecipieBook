import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface AusthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signup(email: string , password : string){
    return this.http.post<AusthResponseData>(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBthtCpVLbLdFsIynF5ECRvTGl3LfCIBSk",
    { email: email,
      password: password,
      returnSecureToken: true
    });
  }


}
