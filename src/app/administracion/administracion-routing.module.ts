
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/servicios/auth/auth-guard.service';
import { AuthGuardCall } from 'app/servicios/auth/auth-guard-call.service';
import { CrearAreaComponent } from './area/crear-area/crear-area.component';
import { CrearSolicitudComponent } from './tipoSolicitud/crear-solicitud/crear-solicitud.component';
import { CrearUsuarioAreaComponent } from './area/crear-usuario-area/crear-usuario-area.component';
import { EditarUsuarioAreaComponent } from './area/editar-usuario-area/editar-usuario-area.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { AlcaldeComponent } from './alcalde/alcalde.component';
import { AuthGuardAdmin } from 'app/servicios/auth/auth-guardAdmin.service';

const routes: Routes = [
    {
        path: 'solicitudes',
        canActivate: [AuthGuardCall],
        children: [
          {
            path: '',
            component: SolicitudesComponent,
          },
        ]
    },
    {
      path: 'area',
      canActivate: [AuthGuard],
      children: [
        {
          path: 'crear',
          component: CrearAreaComponent,
        }
      ]
    },
    {
      path: 'tipo-solicitud',
      canActivate: [AuthGuard],
      children: [
        {
          path: 'crear',
          component: CrearSolicitudComponent,
        }
      ]
    },
    {
      path: 'usuarios-area',
      canActivate: [AuthGuard],
      children: [
        {
          path: 'crear',
          component: CrearUsuarioAreaComponent,
        },
        {
          path: 'editar',
          component: EditarUsuarioAreaComponent,
        },
      ]
    },
    {
      path: 'crearAdmin',
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          component: AlcaldeComponent,
        },
      ]
  },
    
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})export class AdministracionRoutingModule{}