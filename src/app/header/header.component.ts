import { Component, OnDestroy, OnInit} from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  private userSub:Subscription;
  isAuthanticated:boolean = false;

  constructor(private datastorageservice:DataStorageService,
    private authservice:AuthService){}
  

  ngOnInit(): void {
    this.userSub =  this.authservice.user.subscribe(user =>{
      this.isAuthanticated = !user ? false : true;
      //shortcut to this is "this.isAuthanticated = !!user;"
    });
  }
  
  onSaveData(){
    this.datastorageservice.storeRecipe();
  }

  onFetchData(){
    this.datastorageservice.fetchRecipe().subscribe();
  }
  onLogout(){
    this.authservice.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
