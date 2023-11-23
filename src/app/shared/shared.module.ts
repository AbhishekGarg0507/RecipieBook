import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AlertComponent } from "./alert/alert.component";
import { PagenotfoundComponent } from "../pagenotfound/pagenotfound.component";

@NgModule({
    declarations:[
        LoadingSpinnerComponent,
        AlertComponent,
        PagenotfoundComponent
    ],
    exports:[
        LoadingSpinnerComponent,
        AlertComponent,
        PagenotfoundComponent
    ]
})
export class SharedModule{}