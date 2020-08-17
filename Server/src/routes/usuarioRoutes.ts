import { Router } from 'express';

import  { usuarioController } from '../controllers/usuarioControllers'

class UsuarioRoutes {

    public router: Router = Router();

   constructor() {
    this.config();
   }

   config(): void {
       this.router.get('/perfil/:id' , usuarioController.perfil);
       this.router.post('/create-user', usuarioController.create_user); // Crear usuario
       this.router.put('/update-user/:idUsuario',usuarioController.update_user); // Editar el perfil
       this.router.put('/delete-user/:idUsuario',usuarioController.delete_user); // Eliminar el perfil
   }
}


const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;