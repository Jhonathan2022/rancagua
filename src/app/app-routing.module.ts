import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { DefaultLayoutComponent }       from './layouts/default/default.component';

import { ExtraLayoutComponent }         from './layouts/extra/extra.component';

import { Page404Component }             from './pages/extra-pages/page-404/page-404.component';

import { LoginComponent } from './pages/login/login/login.component';

import { Full_ROUTES } from './servicios/routes/routes';
import { InicioComponent } from './pages/login/inicio/inicio.component';

const loginRoutes: Routes = [
  { path: '', component: LoginComponent },
];
const errorRoutes: Routes = [
  { path: '', component: Page404Component }
];
const inicioRoutes: Routes = [
  { path: '', component: InicioComponent },
];


export const routes: Routes = [
  { path: '',pathMatch: 'full',component: ExtraLayoutComponent,children:loginRoutes},
  { path: 'inicio',pathMatch: 'full',component: ExtraLayoutComponent,children:inicioRoutes},
  { path: '', component: DefaultLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES,  },
  { path: '**', component: ExtraLayoutComponent,children: errorRoutes }
];

@NgModule({
  imports: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
