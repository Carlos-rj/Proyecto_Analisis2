import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {GlobalService} from './Servicios/global.service';
import {EliminarService} from  './Servicios/eliminar.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public selectedIndex2 = 0;
  public selectedIndex3 = 0;
  public appPages = [
    {
      title: 'Compras1',
      url: '/folder/Compras1',
      icon: 'mail'
    },
    {
      title: 'Compras2',
      url: '/folder/Compras2',
      icon: 'paper-plane'
    },
    {
      title: 'Compras3',
      url: '/folder/Compras3',
      icon: 'heart'
    },
    {
      title: 'Compras4',
      url: '/folder/Compras4',
      icon: 'archive'
    },
    {
      title: 'Compras5',
      url: '/folder/Compras5',
      icon: 'trash'
    }
  ];

  public appPages2 = [
    {
      title: 'Ventas1',
      url: '/folder/Ventas1',
      icon: 'paper-plane'
    },
    {
      title: 'Ventas2',
      url: '/folder/Ventas2',
      icon: 'heart'
    },
    {
      title: 'Ventas3',
      url: '/folder/Ventas3',
      icon: 'archive'
    },
    {
      title: 'Ventas4',
      url: '/folder/Ventas4',
      icon: 'trash'
    },
    {
      title: 'Ventas5',
      url: '/folder/Ventas5',
      icon: 'warning'
    }
  ];


  public appPages3 = [
    {
      title: 'Log out',
      url: '/login',
      icon: 'warning'
    },
    {
      title: 'Eliminar Usuario',
      url: '/login',
      icon: 'trash'
    }
  ];

  gg: string

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public global: GlobalService,
    public delate: EliminarService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    console.log(path);
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    if (path !== undefined) {
      this.selectedIndex2 = this.appPages2.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    if (path !== undefined) {
      this.selectedIndex3 = this.appPages3.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  salida(i){
    if (i == 0){
      this.selectedIndex3 = i;
      this.global.usuario = null;
    }
    else if (i == 1){
      if (this.global.usuario > 10000000000000){
        this.gg = `${this.global.usuario/100000}`
        console.log(parseFloat(this.gg).toFixed(0));

        this.delate.eliminar(parseFloat(this.gg).toFixed(0)).subscribe(
            res =>{
              alert("Usuario eliminado Google")
            },
            error => console.error(error)
        )
      }
      else {
        this.delate.eliminar(this.global.usuario).subscribe(
            res =>{
              alert("Usuario eliminado")
            },
            error => console.error(error)
        )
      }

    }

  }
}
