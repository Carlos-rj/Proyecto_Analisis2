import { Injectable } from '@angular/core';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import {auth} from 'firebase';
import {GlobalService} from './global.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public afAuth: AngularFireAuth, private google: GooglePlus, private global: GlobalService) { }

  logingoogle() {
    return this.google.login({}).then(result => {
      const userdatagoogle = result;
      this.global.usuario = result.userId;
      return this.afAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userdatagoogle.accessToken));
    });
  }
}
