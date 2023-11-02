import { Component} from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private datastorageservice:DataStorageService){}
  
  onSaveData(){
    this.datastorageservice.storeRecipe();
  }

  onFetchData(){
    this.datastorageservice.fetchRecipe().subscribe();
  }
}
