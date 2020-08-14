import { Component, OnInit } from '@angular/core';
import {LoginService} from  '../../Servicios/login.service';
import {GlobalService} from '../../Servicios/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: string;
  password: string;

  constructor(private authservice: LoginService, private router: Router,
              public global: GlobalService) { }

  ngOnInit() {}

  logingoogle() {
    this.authservice.logingoogle().then( () => {
      console.log(this.global.usuario);
      alert(this.global.usuario);
      alert('si se logro');
      this.router.navigate([`/home/${this.global.usuario}`]);
    }).catch(err => {
      alert('los datos son incorrectos');
    });
  }

  Loginnormal(){
    this.global.usuario = this.user;
    console.log(this.user);
    console.log(this.password);
    console.log(this.global.usuario);
    alert('si se logro normal');
    this.router.navigate([`/home/${this.global.usuario}`]);
  }

  Userinput(value){
    this.user = (value.target.value);
  }

  Passwordinput(value){
    this.password = (value.target.value);
  }
}
