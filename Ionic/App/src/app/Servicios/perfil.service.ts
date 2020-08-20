import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {registro} from "../Modelos/Registro";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class PerfilService {

  private API = 'http://3.90.231.102:3000/';

  constructor(private http: HttpClient) {
  }

  public getPerfil(usuario) {
    return this.http.get(`${this.API}api/user/perfil/${usuario}`);
  }

  public putInfo(request: registro, usuario) {
    return this.http.put(`${this.API}api/user/update-user/${usuario}`, request, httpOptions);
  }
}


