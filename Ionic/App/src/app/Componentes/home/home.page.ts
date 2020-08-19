import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../Servicios/global.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public user;
  constructor(private route: ActivatedRoute, public router: Router, public global: GlobalService) { }

  ngOnInit() {
    if (this.global.usuario === null){
      this.router.navigate([`/`]);
    }
    //console.log(this.global.usuario);
    this.user = this.global.nombre;
  }

}
