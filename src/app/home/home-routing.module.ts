
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GeneralAlcaldeComponent } from './general-alcalde/general-alcalde.component';
import { MapaComponent } from './mapa/mapa.component';


const routes: Routes = [
    {
        path: '',
        // canActivate: [AuthGuardAdminGeneral],
        children: [
          {
            path: '',
            // canActivate: [AuthGuardAdminGeneral],
            component: HomeComponent,
          },
          {
            path: 'general',
            // canActivate: [AuthGuardAdminGeneral],
            component: GeneralAlcaldeComponent,
          },
          {
            path: 'mapa',
            // canActivate: [AuthGuardAdminGeneral],
            component: MapaComponent,
          },
        ]
    
    },
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})export class HomeRoutingModule{}