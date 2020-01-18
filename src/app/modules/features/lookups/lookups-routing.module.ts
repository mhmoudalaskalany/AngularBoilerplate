import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { CountriesComponent } from './countries/countries.component';
import { HolidayDatesComponent } from './holidayDates/holidayDates.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'test',
    pathMatch: 'full'
  },
  {
    path: 'test',
    component: TestComponent,
    pathMatch: 'full'
  },
  {
    path: 'country',
    component: CountriesComponent,
    pathMatch: 'full'
  },
  {
    path: 'holidayDates',
    component: HolidayDatesComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupsRoutingModule { }
