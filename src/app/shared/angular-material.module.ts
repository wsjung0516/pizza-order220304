import {NgModule} from "@angular/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CommonModule} from "@angular/common";
import {MatBadgeModule} from "@angular/material/badge";
const modules = [
  MatSnackBarModule,
  MatBadgeModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [...modules]
})
export class AngularMaterialModule {}
