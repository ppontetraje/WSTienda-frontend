import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Usuario } from "../interfaces/usuario";
import { Response } from '../responseReceiver/response';
import { map } from 'rxjs/operators';
import { Login } from "../interfaces/login";

const httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
@Injectable({providedIn: 'root'})
export class ApiAuthService{
    url: string = 'https://localhost:44357/api/User/login';

    private userSubject!: BehaviorSubject<Usuario>;
    
    public get usuarioData(): Usuario{
      return this.userSubject.value;
    } 

    constructor(private _http: HttpClient){
      this.userSubject = 
      new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')!));
    }

    login(login: Login): Observable<Response> {
        return this._http.post<Response>(this.url, login, httpOption).pipe(
          map(res => {
            if(res.success){
              const user: Usuario = res.data;
              localStorage.setItem('usuario', JSON.stringify(user));
              this.userSubject.next(user);
            }
            return res;
          })
        );
    }
    logout(){
      localStorage.removeItem('usuario');
      this.userSubject.next(null!);
    }
}
