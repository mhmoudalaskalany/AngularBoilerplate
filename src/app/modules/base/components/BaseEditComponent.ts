import { OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { LocalizationService } from '../../core/services/localization/localization.service';
import { TableCoreService } from '../../shared/components/data-table/services/table-core.service';
import { Shell } from './shell';
import { HttpService } from '../../core/services/http/http.service';
import { AlertService } from '../../core/services/alert/alert.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

export abstract class BaseEditComponent implements OnInit {

  isNew = true;
  form: FormGroup;
  url: string;
  abstract get Service(): HttpService;
  abstract get Ref(): DynamicDialogRef;
  abstract get Config(): DynamicDialogConfig;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Route(): Router { return Shell.Injector.get(Router); }
  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }
  constructor() { }


  ngOnInit(): void {
    console.log(this.url);
  }
  close(form) {
    console.log('--------ref', this.Ref);
    console.log('---------config', this.Config);
    console.log('----------form', form);
    if (form == null || form === undefined) {
      this.Ref.close();
      return false;
    }
    if (form === '') {
      return false;
    }
    if (this.isNew) {
      this.submitNew(form);
    } else {
      this.submitUpdate(form);
    }
  }

  submitNew(model: any): void {
    this.Service.postReq('Add', model).subscribe((result: any) => {
      console.log('-------result of add', result);
      if (result != null) {
        return false;
      }
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable(this.url);
      this.Ref.close();

    }, error => {
      // this.Alert.openAlert('Error Adding'); translate it please
    });
  }

  submitUpdate(model: any): void {
    this.Service.putReq('Update', model).subscribe((result: any) => {
      console.log('-------result of update', result);
      if (result != null) {
        return false;
      }
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable(this.url);
      this.Ref.close();
      // this.Alert.openAlert('Updated Successfully');   translate it please

    }, error => {
      // this.Alert.openAlert('Error Updating'); translate it please
    });
  }



}
