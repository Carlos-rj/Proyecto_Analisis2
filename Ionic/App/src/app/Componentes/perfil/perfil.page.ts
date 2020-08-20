import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {PerfilService} from "../../Servicios/perfil.service";
import {GlobalService} from "../../Servicios/global.service";
import {RegistroService} from "../../Servicios/registro.service";
import {registro} from "../../Modelos/Registro";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  datos: any = [];
  colonias: any = [];

  idusuario1: number;
  nombres1: string;
  apellidos1: string;
  fecha_nacimiento1: string;
  correo_electronico1: string;
  contrasena1: string;
  descripcion1: string;
  tipo_usuario1: number;
  tipo_usaurio_st: string;
  id_colonia1: number;
  request: registro;
  folder: number
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


  constructor(private activatedRoute: ActivatedRoute, private perfilService: PerfilService, private registroService: RegistroService, public router : Router, private global : GlobalService,  public alertController: AlertController) { }

  ngOnInit() {
    this.folder = +this.activatedRoute.snapshot.paramMap.get('usuario');
    // alert(this.folder)
    this.perfilService.getPerfil(this.folder).subscribe(
        res =>{
          console.log(res);
          this.setInfo(res);
        },
        error => console.error(error)
    );

    this.registroService.getColonias().subscribe(
        res => {
          this.colonias = res;

        },
        err => console.error(err)
    );
  }

  Modificar(){
    this.request = this.newUser(this.idusuario1, this.nombres1, this.apellidos1, this.fecha_nacimiento1.split('T')[0], this.correo_electronico1, this.contrasena1, '', this.tipo_usuario1, this.id_colonia1);
    console.log(this.request);
    this.perfilService.putInfo(this.request, this.idusuario1).subscribe(
        res => {
          console.log(res);
          this.presentAlert('Felicidades', 'Se actualizo la informacion exitosamente');
          this.returnHome();
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

  returnHome(){
    this.router.navigate([`/home/${this.folder}`]);
  }

  setInfo(res)
  {
    this.idusuario1 = res.idUsuario;
    this.nombres1 = res.nombres;
    this.apellidos1 = res.apellidos;
    this.correo_electronico1 = res.correo_electronico;
    this.contrasena1 = res.contrasena;
    this.fecha_nacimiento1 = res.fecha_nacimiento.split('T')[0];
    console.log(this.fecha_nacimiento1);
    console.log(res.nombre_tipo_usuario);
    if (res.nombre_tipo_usuario = "Vendedor" ){
      this.tipo_usaurio_st = "1";
    }else{
      this.tipo_usaurio_st = "2";
    }
  }


}
