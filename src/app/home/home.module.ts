import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
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
import { ChartsModule }	from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule } from '@angular/forms';
import { GeneralAlcaldeComponent } from './general-alcalde/general-alcalde.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { MapaComponent } from './mapa/mapa.component';
// const config: SocketIoConfig = { url: 'http://localhost:3809', options: {secure: true}};
const config: SocketIoConfig = { url: 'https://prueba.smtrack.cl:3836', options: {secure: true}};
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [HomeComponent, GeneralAlcaldeComponent, MapaComponent],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    HomeRoutingModule,
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
    ChartsModule,
    FormsModule,
    NgCircleProgressModule.forRoot({}),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD-RSOYyLY2ZNgXRv3x6C81qrwnckZ5hHY",
      libraries: ["places"]
    }),
  ]
})
export class HomeModule { }
