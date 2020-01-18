import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { CountriesService } from '../Services/countries.service';
import { BaseEditComponent } from 'src/app/modules/base/components/BaseEditComponent';
import { Country } from 'src/app/modules/core/services/models/country';
import { Shell } from 'src/app/modules/base/components/shell';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent extends BaseEditComponent implements OnInit {
  model: Country = {};
  id: string;
  url = 'countries/GetAllPaged';
  get Service(): CountriesService { return Shell.Injector.get(CountriesService); }
  get Ref(): DynamicDialogRef { return this.ref; }
  get Config(): DynamicDialogConfig { return this.config; }
  constructor(
    fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    super();
    if (this.config.data) {
      this.model = this.config.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      code: [this.model.code],
      nameFl: [this.model.nameFl, Validators.required],
      nameSl: [this.model.nameSl, Validators.required],
    });
  }

  ngOnInit() {
  }

}
