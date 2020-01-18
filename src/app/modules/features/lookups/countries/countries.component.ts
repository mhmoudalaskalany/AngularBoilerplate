import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from './Services/countries.service';
import { CountryComponent } from './country/country.component';
import { DialogService } from 'primeng/api';
import { BaseListComponent } from 'src/app/modules/base/components/BaseListComponent';
import { Shell } from 'src/app/modules/base/components/shell';
import { ColumnsInterface } from 'src/app/modules/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/modules/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [DialogService]
})
export class CountriesComponent extends BaseListComponent implements OnInit {

  get Service(): CountriesService { return Shell.Injector.get(CountriesService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService) {
    super();
  }

  tableData = {
    name: 'lookup.title'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'lookup.code',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'nameFl',
      header: 'lookup.nameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'nameSl',
      header: 'lookup.nameSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    }
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      isView: false
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }

  add(model: any) {
    super.add(model, CountryComponent,'lookup.country', '40%');
  }

}
