import { Router } from 'express';

import  { indexController } from '../controllers/indexControllers'

class IndexRoutes {

    public router: Router = Router();

   constructor() {
    this.config();
   }

   config(): void {
       this.router.post('/login' , indexController.login);
       this.router.get('/login/colonias', indexController.colonias);
   }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;