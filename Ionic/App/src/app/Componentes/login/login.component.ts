import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:import-spacing
import { LoginService } from  '../../Servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: string;
  password: string;
  constructor(private authservice: LoginService) { }

  ngOnInit() {}

  logingoogle() {
    this.authservice.logingoogle().then( () => {
      // this.router.navigate(['/home']);
      alert('si se logro');
    }).catch(err => {
      alert('los datos son incorrectos');
    });

  }
}
