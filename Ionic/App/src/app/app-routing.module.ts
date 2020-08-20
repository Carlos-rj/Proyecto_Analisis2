import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './Componentes/login/login.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home/:usuario',
    loadChildren: () => import('./Componentes/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./Componentes/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil/:usuario',
    loadChildren: () => import('./Componentes/perfil/perfil.module').then( m => m.PerfilPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
