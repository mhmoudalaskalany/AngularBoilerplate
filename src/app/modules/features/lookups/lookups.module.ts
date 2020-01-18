import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupsRoutingModule } from './lookups-routing.module';
import { TestComponent } from './components/test/test.component';
import { SharedModule } from '../../shared/shared.module';
import { AddTestComponent } from './components/test/componenets/add/add-test.component';
import { CoreModule } from '../../core/core.module';
import { DialogService } from 'primeng/api';
import { CountryComponent } from './countries/country/country.component';
import { CountriesComponent } from './countries/countries.component';
import { HolidayDateComponent } from './holidayDates/holidayDate/holidayDate.component';
import { HolidayDatesComponent } from './holidayDates/holidayDates.component';


@NgModule({
  entryComponents : [
    AddTestComponent,CountryComponent,HolidayDateComponent
  ],
  declarations: [
    AddTestComponent,
    TestComponent,CountriesComponent,CountryComponent,HolidayDatesComponent,HolidayDateComponent
  ],
  imports: [
    CommonModule,
    LookupsRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    DialogService
  ]
})
export class LookupsModule { }
