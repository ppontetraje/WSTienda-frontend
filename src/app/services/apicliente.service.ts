import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { Response } from '../responseReceiver/response'

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {

  url: string = 'https://localhost:44357/api/cliente';


  constructor(private http: HttpClient) { 
    
  }
  getClientes(): Observable<Response> {

    return this.http.get<Response>(this.url);

  }

  add(cliente: Cliente): Observable<Response> {
    return this.http.post<Response>(this.url, cliente, httpOption);

  }
}

