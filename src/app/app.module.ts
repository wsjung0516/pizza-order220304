import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PizzaDisplayComponent } from './components/pizza-display/pizza-display.component';
import { PizzaToppingsComponent } from './components/pizza-toppings/pizza-toppings.component';
import {PizzaModule} from "./components/pizza.module";
import {AngularMaterialModule} from "./shared/angular-material.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PizzaModule,
    // AngularMaterialModule,
    MatSnackBarModule
  ],
  providers: [MatSnackBarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
