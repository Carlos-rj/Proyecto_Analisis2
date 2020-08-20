import { Injectable } from '@angular/core';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import {auth} from 'firebase';
import {GlobalService} from './global.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../Modelos/Login';
import {googleusuario} from '../Modelos/google';
import {Router} from '@angular/router';

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
  private googlec: any;
  requestG: googleusuario;
  gg: string
  public salida: number

  newUser(idUsuario,
          nombres,
          apellidos,
          fecha_nacimiento,
          correo_electronico,
          contrasena,
          descripcion,
          tipo_usuario,
          id_colonia) : googleusuario{
    return{
      idUsuario: idUsuario,
      nombres: nombres,
      apellidos: apellidos,
      fecha_nacimiento: fecha_nacimiento,
      correo_electronico: correo_electronico,
      contrasena: contrasena,
      descripcion: descripcion,
      tipo_usuario: tipo_usuario,
      id_colonia: id_colonia
    }
  };

  constructor(public afAuth: AngularFireAuth, private google: GooglePlus, private global: GlobalService,
              private http: HttpClient,
              private router: Router,) { }

  logingoogle() {
    return this.google.login({}).then(result => {
      const userdatagoogle = result;
      this.googlec = result;
      this.global.usuario = result.userId;
      this.global.nombre = result.givenName;
      return this.afAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userdatagoogle.accessToken));
    });
  }

  logon(request: Login){
    return this.http.post(`${this.API}api/login`, request, httpOptions);
  }

  registrarG(requestg: googleusuario){
    return this.http.post(`${this.API}api/user/create-user/`, requestg, httpOptions);
  }

  llamagoogle(){
    this.gg = `${this.global.usuario/100000}`
    this.requestG = this.newUser(
        parseFloat(this.gg).toFixed(0),
        this.googlec.givenName,
        this.googlec.familyName,
        "1995-01-11",
        this.googlec.email,
        "1234",
        "Google",
        1,
        1
    );

    this.registrarG(this.requestG).subscribe(
        res =>{
          this.salida = 1;
          this.global.nombre = this.googlec.givenName;
          console.log(this.global.nombre);
          alert("Registrado Google Exitoso");
          this.returnLogin();
        },
        error =>{
          alert("Error Google");
        }
    )
  }

  returnLogin(){
    this.router.navigate([`/home/${parseFloat(this.gg).toFixed(0)}`]);
  }
}
