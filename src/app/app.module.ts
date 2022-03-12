import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PizzaModule} from "./components/pizza.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgxsModule} from "@ngxs/store";
import {AppRoutingModule} from "./app.routing.module";
import {PizzasGuard, ToppingsGuard} from "./guards";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PizzaModule,
    // AngularMaterialModule,
    MatSnackBarModule,
    AppRoutingModule,
    NgxsModule.forRoot([]),
  ],
  providers: [MatSnackBarModule, PizzasGuard, ToppingsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
