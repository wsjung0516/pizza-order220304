import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
// import 'rxjs/operators';
// import 'rxjs/add/observable/throw';

import { Topping } from '../models';
import {throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ToppingsService {
  constructor(private http: HttpClient) {}

  getToppings(): Observable<Topping[]> {
    return this.http
      .get<Topping[]>(`assets/json/db.json`)
      .pipe(
        // tap( val=> console.log('read toppings', val)),
        map( (val: any)=> val['toppings']),
        catchError((error: any) => throwError(error.json())));
  }
/*
  getToppings(): Observable<Topping[]> {
    return this.http
      .get<Topping[]>(`http://localhost:3000/toppings`)
      .pipe(
        tap( val=> console.log('read toppings', val)),
        catchError((error: any) => Observable.throw(error.json())));
  }
*/
}
