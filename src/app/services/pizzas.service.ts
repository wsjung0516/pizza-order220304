// import 'rxjs/add/observable/throw';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { Pizza } from '../models';

@Injectable({ providedIn: 'root' })
export class PizzasService {
  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(`assets/json/db.json`)
            // .get<Pizza[]>(`/api/pizzas`)
      .pipe(
        map( (val: any) =>val['pizzas']),
        catchError((error: any) => throwError(error.json())));
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(`http://localhost:3000/pizzas`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    console.log('updatePizza-->',payload);
    return this.http
      .put<Pizza>(`http://localhost:3000/pizzas/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`http://localhost:3000/pizzas/${payload.id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
