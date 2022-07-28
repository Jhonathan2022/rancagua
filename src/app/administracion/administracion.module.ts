import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionRoutingModule } from './administracion-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NiComponentsModule }	from '../ni-components/ni-components.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
// const config: SocketIoConfig = { url: 'http://localhost:3809', options: {secure: true}};
const config: SocketIoConfig = { url: 'https://prueba.smtrack.cl:3836', options: {secure: true}};
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import { AuthGuard } from 'app/servicios/auth/auth-guard.service';
import { AuthGuardCall } from 'app/servicios/auth/auth-guard-call.service';
import { CrearAreaComponent } from './area/crear-area/crear-area.component';
import { CrearSolicitudComponent } from './tipoSolicitud/crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './tipoSolicitud/editar-solicitud/editar-solicitud.component';
import { CrearUsuarioAreaComponent } from './area/crear-usuario-area/crear-usuario-area.component';
import { EditarUsuarioAreaComponent } from './area/editar-usuario-area/editar-usuario-area.component';
import { CustomEditorAreasComponent } from './tipoSolicitud/crear-solicitud/custom-editor-sucursal.component';
import { EditarRequerimientoProceso, FinalizarRequerimientoProceso, SolicitudesComponent, VerRequerimiento } from './solicitudes/solicitudes.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AlcaldeComponent } from './alcalde/alcalde.component';
import { AuthGuardAdmin } from 'app/servicios/auth/auth-guardAdmin.service';


export const MY_MOMENT_FORMATS = {
  fullPickerInput: {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {day: 'numeric', month: 'numeric', year: 'numeric',},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};
@NgModule({
  declarations: [CrearAreaComponent, CrearSolicitudComponent, EditarSolicitudComponent, 
    CrearUsuarioAreaComponent, EditarUsuarioAreaComponent,CustomEditorAreasComponent, SolicitudesComponent,VerRequerimiento,EditarRequerimientoProceso,FinalizarRequerimientoProceso, AlcaldeComponent],
  imports: [
    SocketIoModule.forRoot(config),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NiComponentsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    AdministracionRoutingModule,
    Ng2SmartTableModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgCircleProgressModule.forRoot({}),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD-RSOYyLY2ZNgXRv3x6C81qrwnckZ5hHY",
      libraries: ["places"]
    }),
  ],
  providers:[{provide:OWL_DATE_TIME_FORMATS,useValue: MY_MOMENT_FORMATS},AuthGuard,AuthGuardCall,AuthGuardAdmin],
  entryComponents:[CustomEditorAreasComponent,VerRequerimiento,EditarRequerimientoProceso,FinalizarRequerimientoProceso]

})
export class AdministracionModule { }
