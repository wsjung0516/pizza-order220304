import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PizzaModule} from "./components/pizza.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgxsModule} from "@ngxs/store";
import {AppRoutingModule} from "./app.routing.module";
import {PizzaExistsGuards, PizzasGuard, ToppingsGuard} from "./guards";
import {AngularMaterialModule} from "./shared/angular-material.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PizzaModule,
    AngularMaterialModule,
    MatSnackBarModule,
    // AppRoutingModule,
    NgxsModule.forRoot([]),
  ],
  providers: [PizzasGuard, ToppingsGuard, PizzaExistsGuards],
  bootstrap: [AppComponent]
})
export class AppModule { }
