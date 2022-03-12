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
import { MainPanelComponent } from './main-panel/main-panel.component';
import { PizzaProductComponent } from './pizza-product/pizza-product.component';
import { PizzaItemComponent } from './pizza-item/pizza-item/pizza-item.component';
import {RouterModule, Routes} from "@angular/router";
import { PizzaItemListComponent } from './pizza-item/pizza-item-list/pizza-item-list.component';
import { SelectedToppingListComponent } from './selected-toppings/selected-topping-list/selected-topping-list.component';
import { SelectedToppingItemComponent } from './selected-toppings/selected-topping-item/selected-topping-item.component';
import {NgxsModule} from "@ngxs/store";
import {PizzasState, ToppingsState} from "../state";
import {HttpClientModule} from "@angular/common/http";
import {PizzaExistsGuards, PizzasGuard, ToppingsGuard} from "../guards";
const routes: Routes = [
  {
    path: '',
    canActivate: [PizzasGuard],
    component: MainPanelComponent
  },
  {
    path: 'new',
    canActivate: [ToppingsGuard],
    component: PizzaItemComponent
  },
  {
    path: ':pizzaId',
    canActivate: [PizzaExistsGuards, ToppingsGuard],
    component: PizzaProductComponent,
  }
];
@NgModule({
  declarations: [
    PizzaDisplayComponent,
    PizzaToppingsComponent,
    PizzaFormComponent,
    ButtonsComponent,
    PizzaNameComponent,
    MainPanelComponent,
    PizzaProductComponent,
    PizzaItemComponent,
    PizzaItemListComponent,
    SelectedToppingListComponent,
    SelectedToppingItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    RouterModule.forChild(routes),
    NgxsModule.forRoot([]),
    NgxsModule.forFeature([ToppingsState, PizzasState]),
    HttpClientModule
  ],
  exports: [
    PizzaDisplayComponent,
    PizzaToppingsComponent,
    PizzaFormComponent,
    ButtonsComponent,
    PizzaNameComponent,
    MainPanelComponent,
    PizzaProductComponent,
    PizzaItemComponent,
    PizzaItemListComponent,
    SelectedToppingListComponent,
    SelectedToppingItemComponent,
  ]
})
export class PizzaModule{}
