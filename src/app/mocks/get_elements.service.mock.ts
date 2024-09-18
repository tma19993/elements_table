import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { PeriodicElement } from '../types';
import { HttpClient } from '@angular/common/http';
import { ELEMENT_DATA } from '../constants/constants';



@Injectable({
  providedIn: 'root'
})
export class GetElementsServiceMock {

  constructor(private http: HttpClient) { }

  public get():Observable<PeriodicElement[]>{

    return of(ELEMENT_DATA).pipe(delay(2000));
  }
}
