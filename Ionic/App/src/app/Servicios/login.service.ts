import { Injectable } from '@angular/core';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import {auth} from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public afAuth: AngularFireAuth, private google: GooglePlus) { }

  logingoogle() {
    return this.google.login({}).then(result => {
      const userdatagoogle = result;

      return this.afAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userdatagoogle.accessToken));
    });
  }
}
