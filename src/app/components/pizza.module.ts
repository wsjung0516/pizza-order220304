import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PizzaDisplayComponent} from "./pizza-display/pizza-display.component";
import {PizzaToppingsComponent} from "./pizza-toppings/pizza-toppings.component";
import {AngularMaterialModule} from "../shared/angular-material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PizzaFormComponent } from './pizza-form/pizza-form.component';
import { ButtonsComponent } from './pizza-form/buttons/buttons.component';
import { PizzaNameComponent } from './pizza-form/pizza-name/pizza-name.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PizzaDisplayComponent,
    PizzaToppingsComponent,
    PizzaFormComponent,
    ButtonsComponent,
    PizzaNameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
  ],
  exports: [
    PizzaDisplayComponent,
    PizzaToppingsComponent,
    PizzaFormComponent,
    ButtonsComponent,
    PizzaNameComponent
  ]
})
export class PizzaModule { }
