import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './components/app/app.component';
import { ExpediaServiceService } from './components/shared/expedia-service.service';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SliderModule } from 'primeng/primeng';
import { AgmCoreModule } from '@agm/core';
import { DataListModule } from 'primeng/primeng';
import {  } from '@types/googlemaps';
const routes: Routes = [
    { path: '', redirectTo: '/search', pathMatch: 'full' },

    { path: 'search', component: AppComponent }
]


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule,
        SliderModule,
        DataListModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyC8Wc0DF7WOjTlrswx8SUMTeD0NTu4sRww",
            libraries: ["places"]
        }
        ),
        RouterModule.forRoot(
            routes
        )
    ],
    providers: [ExpediaServiceService],
    bootstrap: [AppComponent]
})
export class AppModuleShared { }


//import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
//import { RouterModule } from '@angular/router';

//import { AppComponent } from './components/app/app.component';


//@NgModule({
//    declarations: [
//        AppComponent
//    ],
//    imports: [
//        CommonModule,
//        HttpModule,
//        FormsModule,
//        RouterModule.forRoot([
//            { path: '', redirectTo: 'app', pathMatch: 'full' },
//            { path: '**', redirectTo: 'app' }
//        ])
//    ]
//})
//export class AppModuleShared {
//}
