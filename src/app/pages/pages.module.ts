import { NgModule }	from '@angular/core';
import { CommonModule }	from '@angular/common';
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
import { ChartsModule }	from 'ng2-charts';
import { NgxChartsModule }	from '@swimlane/ngx-charts';
import { CalendarModule } from 'angular-calendar';
import { AgmCoreModule }	from '@agm/core';
import { AmChartsModule }	from '@amcharts/amcharts3-angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';




import { Page404Component }	from './extra-pages/page-404/page-404.component';

@NgModule({
  imports: [
    CalendarModule.forRoot(),
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
    ChartsModule,
    NgxChartsModule,
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyD-RSOYyLY2ZNgXRv3x6C81qrwnckZ5hHY'
    }),
    AmChartsModule,
    LeafletModule.forRoot()
  ],
  declarations: [
    Page404Component,
  ]
})
export class PagesModule {}
