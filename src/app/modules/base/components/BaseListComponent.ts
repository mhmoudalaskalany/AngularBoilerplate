import { OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service';
import { LocalizationService } from '../../core/services/localization/localization.service';
import { Shell } from './shell';
import { AlertService } from '../../core/services/alert/alert.service';
import { DialogService } from 'primeng/api';

export abstract class BaseListComponent implements OnInit {

  abstract get Service(): HttpService;
  abstract get Dialog(): DialogService;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Route(): Router { return Shell.Injector.get(Router); }
  @Output() addClick: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }

  ngOnInit(): void {
  }

  add(model: any, dialog: any, header, width = 'auto') {
    this.openDialog(model, dialog, header, width);
  }

  openViewDetail(model: any, dialog: any, header, width = 'auto') {
    this.openDialog(model, dialog, header, width)
  }

  protected openDialog(model: any, dialog: any, header, width): void {

    this.Dialog.open(dialog, {
      header: this.localize.translate.instant(header),
      width: width,
      rtl: false,
      //styleClass: 'dialogscroll',
      data: model ? model : ''
    });
  }
}
