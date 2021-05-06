import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../interfaces/venta';
import { Response } from '../responseReceiver/response';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiventaService {
  url: string = 'https://localhost:44357/api/sale'

  constructor(
    private _httpClient: HttpClient
  ) { }
  add(venta: Venta) : Observable<Response>{
    console.log(venta);
    return this._httpClient.post<Response>(this.url, venta, httpOption)
  }
}
