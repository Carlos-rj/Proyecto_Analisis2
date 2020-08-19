import { Injectable } from '@angular/core';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import {auth} from 'firebase';
import {GlobalService} from './global.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../Modelos/Login';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API = 'http://3.90.231.102:3000/';

  constructor(public afAuth: AngularFireAuth, private google: GooglePlus, private global: GlobalService,
              private http: HttpClient) { }

  logingoogle() {
    return this.google.login({}).then(result => {
      const userdatagoogle = result;
      this.global.usuario = result.userId;
      this.global.nombre = result.givenName;
      return this.afAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userdatagoogle.accessToken));
    });
  }

  logon(request: Login){
    return this.http.post(`${this.API}api/login`, request, httpOptions);
  }

}
