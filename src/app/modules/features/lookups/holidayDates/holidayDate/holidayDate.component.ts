import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HolidayDatesService } from '../Services/holidayDates';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { BaseEditComponent } from 'src/app/modules/base/components/BaseEditComponent';
import { HolidayDate } from 'src/app/modules/core/services/models/HolidayDate';
import { Shell } from 'src/app/modules/base/components/shell';
import { Country } from 'src/app/modules/core/services/models/country';
import { Holiday } from 'src/app/modules/core/services/models/Holiday';

@Component({
  selector: 'app-holiday-date',
  templateUrl: './holidayDate.component.html',
  styleUrls: ['./holidayDate.component.scss']
})
export class HolidayDateComponent extends BaseEditComponent implements OnInit {

  model: HolidayDate = {};
  id: string;
  url = 'HolidayDates/GetAllPaged';
  get Service(): HolidayDatesService { return Shell.Injector.get(HolidayDatesService); }
  get Ref(): DynamicDialogRef { return this.ref; }
  get Config(): DynamicDialogConfig { return this.config; }
  form: FormGroup;
  countries: Country[];
  holidays: Holiday[];

  constructor(
    fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    super();
    if (this.config.data) {
      this.model = this.config.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      holidayId: [this.model.holidayId, Validators.required],
      startDate: [this.model.startDate, Validators.required],
      endDate: [this.model.endDate, Validators.required],
      countryId: [this.model.countryId, Validators.required],
      notes: [this.model.notes],
    });
  }

  ngOnInit() {
    this.getLookups();
  }

  getLookups(): void {
    this.Service.getLookup()
      .subscribe(data => {
        this.countries = data[0];
        this.holidays = data[1];
      });
  }

}
