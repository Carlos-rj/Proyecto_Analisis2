import { Component, OnInit } from '@angular/core';
import { RegistroService } from "../../Servicios/registro.service";
import { registro } from "../../Modelos/Registro";

import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  idusuario1: number;
  nombres1: string;
  apellidos1: string;
  fecha_nacimiento1: string;
  correo_electronico1: string;
  contrasena1: string;
  descripcion1: string;
  tipo_usuario1: number;
  id_colonia1: number;
  request: registro;
  colonias: any = [];

  newUser(idusuario1, nombres1, apellidos1, fecha_nacimiento1, correo_electronico1, contrasena1, descripcion1, tipo_usuario1, id_colonia1) : registro{
    return{
      idusuario: idusuario1,
      nombres: nombres1,
      apellidos: apellidos1,
      fecha_nacimiento: fecha_nacimiento1,
      correo_electronico: correo_electronico1,
      contrasena: contrasena1,
      descripcion: descripcion1,
      tipo_usuario: tipo_usuario1,
      id_colonia: id_colonia1
    }
  };

  constructor(private registroService: RegistroService, public router : Router,  public alertController: AlertController) { }

  ngOnInit() {

    this.registroService.getColonias().subscribe(
        res => {
          this.colonias = res;
        },
        err => console.error(err)
    );
  }


  Registrar(){
    this.idusuario1 = Math.floor(Math.random() * 9999999999);
    this.request = this.newUser(this.idusuario1, this.nombres1, this.apellidos1, this.fecha_nacimiento1.split('T')[0], this.correo_electronico1, this.contrasena1, '', this.tipo_usuario1, this.id_colonia1);
    console.log("HOLA");
    console.log(this.request);
    this.registroService.registrar(this.request).subscribe(
        res => {
          console.log(res);
          this.presentAlert('Felicidades', 'Usuario Registrado');
          this.returnLogin();
          },
          error => console.error(error)
      )
  }

  async presentAlert(title, message) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  returnLogin(){
    this.router.navigate(['login'])
  }

}
