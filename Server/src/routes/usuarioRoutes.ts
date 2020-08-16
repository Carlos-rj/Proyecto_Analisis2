import { Router } from 'express';

import  { usuarioController } from '../controllers/usuarioControllers'

class UsuarioRoutes {

    public router: Router = Router();

   constructor() {
    this.config();
   }

   config(): void {
       this.router.get('/perfil/:id' , usuarioController.perfil);
   }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;