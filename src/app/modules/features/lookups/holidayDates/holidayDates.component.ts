import { HolidayDateComponent } from './holidayDate/holidayDate.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { HolidayDatesService } from './Services/holidayDates';
import { DialogService } from 'primeng/api';
import { BaseListComponent } from 'src/app/modules/base/components/BaseListComponent';
import { Shell } from 'src/app/modules/base/components/shell';
import { ColumnsInterface } from 'src/app/modules/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/modules/shared/components/data-table/models/actions.interface';
import { filterDropDownList } from 'src/app/modules/core/services/models/filterDropDownList';

@Component({
  selector: 'app-holidayDates',
  templateUrl: './holidayDates.component.html',
  styleUrls: ['./holidayDates.component.scss']
})


export class HolidayDatesComponent extends BaseListComponent implements OnInit{

  get Service(): HolidayDatesService { return Shell.Injector.get(HolidayDatesService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService) {
    super();
  }
  tableData = {
    name: 'holidayDates.holidayDates'
  };
 

  public columns: ColumnsInterface[] = [
    
    {
      field: 'publicHolidayNameFl',
      dropdownFilterName:'holidayId',
      header: 'holidayDates.holidayName',    
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true
      
    },
    {
      field: 'startDate',
      header: 'holidayDates.startDate',    
      filterMode: 'date',
      customCell: 'date',
      selector: true,      
      print: true,
      sort: true

     
    },
    {
      field: 'endDate',
      header: 'holidayDates.endDate',    
      filterMode: 'date',
      customCell: 'date',
      selector: true,      
      print: true,
      sort: true

    },
    {
      field: 'countryNameFl',
      dropdownFilterName:'countryId',
      header: 'holidayDates.countryName',    
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true
    },
  
    
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
     this.countries();
    this.holidaies();

  }
  add(model: any) {
    super.add(model, HolidayDateComponent,'holidayDates.holidayDates',"50%");
  }

  countries(): void {
    this.Service.getCountries().subscribe((data: any) => {
      this.columns[3].filterDropdown = data;
    });
  }
  holidaies(): void {
    this.Service.getHolidaies().subscribe((data: any) => {
      this.columns[0].filterDropdown = this.SetDropdownHoliday(data);
    });
  }

  SetDropdownHoliday(data:any){
    let filterInputs: filterDropDownList[] = [];
    data.forEach(Obj=> {
      let filterinput = new filterDropDownList();
      filterinput.nameFl = Obj.publicHolidayNameFL;
      filterinput.nameSl = Obj.publicHolidayNameSL;
      filterinput.id = Obj.id;
      filterInputs.push(filterinput);
   });
    return filterInputs;
  }
}