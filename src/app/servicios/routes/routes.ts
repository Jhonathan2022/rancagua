import { Routes, RouterModule } from '@angular/router';


export const Full_ROUTES: Routes = [
    {
        path: 'administracion',
        loadChildren: './administracion/administracion.module#AdministracionModule',
      // canActivate: [AuthGuard],
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule',
      // canActivate: [AuthGuard],
    },
    ]