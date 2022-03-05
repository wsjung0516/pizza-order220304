import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PizzaDisplayComponent } from './components/pizza-display/pizza-display.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [PizzaDisplayComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
