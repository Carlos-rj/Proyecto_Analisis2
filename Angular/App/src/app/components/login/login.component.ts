import { Component,OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { NgZone, Injectable, Optional } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { filter, catchError, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, merge, of } from 'rxjs';
import { IUser } from 'src/app/models/IUser';

declare var gapi: any;

export class SocialUser{
  id?: string;
  name?:string;
  email?: string;
  photoUrl?: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user=''
  password=''
  errorAutenticacion="";

  constructor(private router: Router,public authenticatorService: AutenticacionService,
    private zone: NgZone) {
    
    window['onSignIn'] = this.onSignIn;
    this.loadGoogleScript().then(() => {
      console.log((window as any).Zone.current.name);
      return this.zone.run(() => this.init$.next(true));
    });
   }

  ngOnInit(): void {
  }


  public authenticated: boolean;
  private readonly url = 'https://apis.google.com/js/platform.js';
  private init$ = new BehaviorSubject<boolean>(false);
  private googleAuth: any;
  public miUsuario:SocialUser;
  miUsuarioAny:any;

  public acquireToken(): Observable<string> {
    return new Observable((subscriber) => {
      this.init$.pipe(filter((x) => x)).subscribe(() => {
        const isSignedIn = this.googleAuth.isSignedIn.get();
        const token = isSignedIn ? this.googleAuth.currentUser.get().getAuthResponse(true).id_token : null;
        this.authenticated = !(!token);
        subscriber.next(token);
      });
    });
  }
  
  public signIn(): Observable<SocialUser> {
    const z1$ = this.init$.pipe(
      filter(x => x && !this.googleAuth.isSignedIn.get()),
      switchMap(() => {
        return new Observable(subscriber => {
          this.googleAuth.signIn().then(() => this.zone.run(() => {
            this.authenticated = true;
            this.miUsuarioAny = this.googleAuth.currentUser.get().getBasicProfile();
            console.log("DATO : ",this.googleAuth.currentUser.get());
            subscriber.next();
          }));
        });
      }),
    );
    const z2$ = this.init$.pipe(filter(x => x && this.googleAuth.isSignedIn.get()), tap(_ => this.authenticated = true));
    return merge(z1$, z2$).pipe(catchError(_ => of(null))); // catch error when closing login screen
  }

  public signOut(): Observable<any> {
    
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    return new Observable((subscriber) => {
      this.googleAuth.signOut().then((err: any) => {
        this.authenticated = false;
        subscriber.next(err);
      });
    });
  }

  public getSocialUser(): SocialUser {
    let profile: any;
    let authResponseObj: any;
    profile = this.googleAuth.currentUser.get().getBasicProfile();
    authResponseObj = this.googleAuth.currentUser.get().getAuthResponse(true);
    if (!profile || !authResponseObj) {
      return null;
    }
    const user: SocialUser = {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      photoUrl: profile.getImageUrl(),
    } as SocialUser;

    return user;
  }

  private loadGoogleScript() {
    return new Promise((resolve) => {
      this.loadScript(this.url, () => this.googleLoad().then(() => resolve(true)));
    });
  }

  private googleLoad() {
    return new Promise((resolve) => gapi.load('auth2', () => this.googleInit().then(() => resolve(true))));
  }

  private googleInit() {
    const config = '252095723422-j556drannkkuha2cs0iv3k41jp07j7c1.apps.googleusercontent.com';
    return new Promise((resolve) => {
      this.googleAuth = gapi.auth2.init({ client_id: '252095723422-j556drannkkuha2cs0iv3k41jp07j7c1.apps.googleusercontent.com', scope: 'email' });
      this.googleAuth.then(() => resolve(true));
    });
  }

  private loadScript(url: string, onload: any) {
    const signInJS = document.createElement('script');
    signInJS.async = true;
    signInJS.src = url;
    signInJS.onload = onload;
    document.head.appendChild(signInJS);
  }



  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    this.router.navigate(['/dashboard']);

  }
  

  public iniciarSesion() {
    var auth2 = gapi.auth2.getAuthInstance();
    //console.log("ID ",auth2.currentUser.get().getBasicProfile().getId());
    //console.log("NOMBRE ",auth2.currentUser.get().getBasicProfile().getName());
    //console.log("CORREO ",auth2.currentUser.get().getBasicProfile().getEmail());
    //console.log("FOTO ",auth2.currentUser.get().getBasicProfile().getImageUrl());
    //console.log("TEST ",auth2.currentUser.get());
    //console.log("GAPI  ", gapi.auth2.getAuthInstance());
    //console.log("IS SIGNED ",auth2.isSignedIn.get());
    let user={
      nombres:auth2.currentUser.get().getBasicProfile().getName(),
      apellidos:"",
      correo_electronico:auth2.currentUser.get().getBasicProfile().getEmail(),
      tipo_usuario:1,
      id_colonia:1,
      contrasena:'user123',
      idUsuario:0
    };
    
    if(auth2.isSignedIn.get()){
      localStorage.setItem("username",auth2.currentUser.get().getBasicProfile().getName());
      this.router.navigate(['/dashboard']);
    }
  }

  login(){
    this.authenticatorService.login(this.user,this.password).subscribe(
      res=>{
        
        if(res.res!=undefined && res.res==false){
          this.errorAutenticacion="Verifique usuario y contraseña.";
        }else{
          this.router.navigate(['/dashboard']);       
        }
      }
    );
  }


  
  
}
