import { Component, OnInit } from '@angular/core';
import {LoginService} from  '../../Servicios/login.service';
import {GlobalService} from '../../Servicios/global.service';
import {Router} from '@angular/router';
import {Login} from '../../Modelos/Login';
import {googleusuario} from '../../Modelos/google';
import {Cuenta} from '../../Modelos/Cuenta';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: number;
  password: string;
  request: Login;
  requestG: googleusuario;
  gg: string
  
  newlogin(user, password): Login{
    return {
      id: user,
      password : password
    }
  }

  constructor(private authservice: LoginService, private router: Router,
              public global: GlobalService) { }

  ngOnInit() {}

  logingoogle() {
    this.authservice.logingoogle().then( () => {
      console.log(this.global.usuario);
      this.gg = `${this.global.usuario/100000}`;
      // this.global.usuario = +Number.parseFloat(this.gg).toFixed(0)
      console.log(parseFloat(this.gg).toFixed(0));

      this.request = this.newlogin(parseFloat(this.gg).toFixed(0), 1234);
      this.authservice.logon(this.request).subscribe(
          (res: Cuenta[]) =>{
            // @ts-ignore
            this.global.nombre = res.nombres;
            console.log(this.global.nombre);
            // @ts-ignore
            if (res.res != false){
                this.router.navigate([`/home/${parseFloat(this.gg).toFixed(0)}`]);
            }
            else{
                this.authservice.llamagoogle()
            }
          },
          error => console.error(error)
      )


    }).catch(err => {
      alert('los datos son incorrectos');
    });
  }

  Loginnormal(){
    this.global.usuario = this.user;
    console.log(this.global.usuario);
    if(this.password !== '' && this.user){
      this.request = this.newlogin(this.user, this.password);
      this.authservice.logon(this.request).subscribe(
          (res: Cuenta[]) =>{
            // @ts-ignore
            this.global.nombre = res.nombres;
            console.log(this.global.nombre);

            // @ts-ignore
            if (res.res != false){
              this.router.navigate([`/home/${this.global.usuario}`]);
            }
            else{
              alert('Usuario o contraseña son incorrectos');
            }
          },
          error => console.error(error)
      )
    }
    else{
      alert('Usuario o contraseña vacios');
    }
  }

  Registrarse(){
      this.router.navigate([`/registro`]);
  }

  Userinput(value){
    this.user = (value.target.value);
  }

  Passwordinput(value){
    this.password = (value.target.value);
  }
}
