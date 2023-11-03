import { AuthService } from './../services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate{
    
    constructor(private authservice:AuthService,
        private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authservice.user.pipe(
            take(1),
            map( user =>{
            const isAuth = !!user;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }));

    }
}