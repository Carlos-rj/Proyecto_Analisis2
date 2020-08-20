import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { registro } from "../Modelos/Registro";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private API = 'http://3.90.231.102:3000/';

  constructor(private http: HttpClient) { }

  public getColonias(){
    return this.http.get(`${this.API}api/login/colonias`);
  }

  public registrar(request: registro){
    return this.http.post(`${this.API}api/user/create-user/`, request, httpOptions);
  }
}
