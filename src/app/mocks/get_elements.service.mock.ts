import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { PeriodicElement } from '../types';
import { HttpClient } from '@angular/common/http';

const ELEMENT_DATA: PeriodicElement[] = [
  {number: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {number: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {number: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {number: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {number: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {number: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {number: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {number: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {number: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {number: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

@Injectable({
  providedIn: 'root'
})
export class GetElementsServiceMock {

  constructor(private http: HttpClient) { }

  public get():Observable<PeriodicElement[]>{

    return of(ELEMENT_DATA).pipe(delay(2000));
  }
}
