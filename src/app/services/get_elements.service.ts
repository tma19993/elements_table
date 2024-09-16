import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetElementsService {

  constructor(private http: HttpClient) { }

  public get(): Observable<PeriodicElement[]> {
    const apiUrl = "";
    return this.http.get<PeriodicElement[]>(apiUrl);
  }
}
