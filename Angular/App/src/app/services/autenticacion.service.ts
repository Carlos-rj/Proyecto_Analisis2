import { Injectable, NgZone, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/IUser';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

    API_URL="http://3.90.231.102:3000/api";
    constructor(private http:HttpClient) { }

    
    login(usuario:string,pass:string) :Observable<any>{
      
      var login_var={
        id:usuario,
        password:pass
      }
      return this.http.post<any>(`${this.API_URL}/login`,login_var)
      .pipe(tap(
        (res:any)=>{
          
          if(res.res==false){
            //
          }else{
            localStorage.setItem("username",res.Nombre);
            let user_json=JSON.stringify(res);
            localStorage.setItem("CurrentUser",user_json);
          }
        }
      ));
    }

}
