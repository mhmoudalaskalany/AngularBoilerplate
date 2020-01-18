import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { TestService } from '../../services/test.service';
import { BaseEditComponent } from 'src/app/modules/base/components/BaseEditComponent';
import { Country } from 'src/app/modules/core/services/models/country';
import { Shell } from 'src/app/modules/base/components/shell';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add.test.component.scss'],
})
export class AddTestComponent extends BaseEditComponent {
  model: Country = {};
  id: string;
  url = 'countries/GetAllPaged';
  get Service(): TestService { return Shell.Injector.get(TestService); }
  get Ref(): DynamicDialogRef { return this.ref; }
  get Config(): DynamicDialogConfig { return this.config; }
  constructor(
    public fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
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
      cityId: ['']
    });
  }

}
