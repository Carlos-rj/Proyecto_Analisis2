import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EliminarService {
  private API = 'http://3.90.231.102:3000/';

  constructor(private http: HttpClient) { }

  public eliminar(carnet){
    return this.http.put(`${this.API}api/user/delete-user/${carnet}`,null);
  }
}
