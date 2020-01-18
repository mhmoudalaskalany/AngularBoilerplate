import {
  Component, OnInit, Input,
  OnDestroy, OnChanges, Output, ViewEncapsulation
} from '@angular/core';
import { TableUrlInterface } from './models/table-url.interface';
import { ColumnsInterface } from './models/columns.interface';
import { ActionsInterface } from './models/actions.interface';
import { TableOptionsInterface } from './models/options.interface';
import { TableCoreService } from './services/table-core.service';
import {
  take,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  finalize,
} from 'rxjs/operators';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { DeleteDialogComponent } from './components/Delete-dialog.component';
import { ExcelService } from './services/excel.service';
import { fedra } from './font';
import { DialogService } from 'primeng/api';
import { StorageService } from 'src/app/modules/core/services/storage/storage.service';
import { LocalizationService } from 'src/app/modules/core/services/localization/localization.service';
import { DropDownOptions } from './models/dropDownOptions.interface';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, OnDestroy {

  @Input() tableData: any;
  @Input() data: any[];
  @Input() url: TableUrlInterface;
  @Input() columns: ColumnsInterface[];
  @Input() actions: ActionsInterface[];
  @Input() id = 'id';
  @Input() options: TableOptionsInterface;

  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewDetail: EventEmitter<any> = new EventEmitter<any>();
  selectedColumns: ColumnsInterface[] = [];
  columnData: any[] = [];
  filteredArray: string[] = [];
  columnsHeaders: any[] = [];
  clientSide: boolean;
  listForm: FormGroup;
  columnFormArray: FormArray;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private firstInit: boolean; // To trigger the first time data load
  selectedRows: any[];

  dropDownOptions: DropDownOptions[] = [
    {
      id: null,
      name: 'All'
    },
    {
      id: 1,
      name: 'Check'
    },
    {
      id: 0,
      name: 'UnCheck'
    }
  ];

  filter: any = {};
  constructor(
    private fb: FormBuilder,
    private excelService: ExcelService,
    public tableCore: TableCoreService,
    public storageService: StorageService,
    public localize: LocalizationService,
    public dialog: DialogService
  ) {
  }

  ngOnInit() {
    this.getColumns();
    this.getDataFromService();
    this.columnSearchInput();
    this.buildEditableForm();
    this.options = {
      add: true,
      search: true,
      reorder: false,
      loading: false,
      details: true,
      check: false,
      columnSearch: true,
      editable: false,
      ...this.options
    };
    console.log(this.columns);

  }

  getColumns(): void {
    let columnsInStorage = JSON.parse(this.storageService.get('primeColumns'));
    if (columnsInStorage != null || columnsInStorage != undefined) {
      this.selectedColumns = [...columnsInStorage];
    } else {
      this.selectedColumns = [...this.columns];
    }
    this.updateSelectedColumnsAPI();
  }

  saveColumnsOrder(event): void {
    this.storageService.set('primeColumns', JSON.stringify(event.columns));
  }
  showOrHideColumns(column: ColumnsInterface) {
    if (!column.selector) {
      let index = this.selectedColumns.indexOf(column);
      this.selectedColumns.splice(index, 1);
      // if columns are 1 then make it disabled
      if (this.selectedColumns.length == 1) {
        let x = this.selectedColumns[0];
        x.disable = true;
        let lastColumnIndex = this.columns.indexOf(x);
        this.columns.splice(lastColumnIndex, 1);
        this.columns = [...this.columns, x];
      }
    } else {
      this.selectedColumns = [...this.selectedColumns, column];
      // if columns are mor thean one then make all of them non disabled
      if (this.selectedColumns.length > 1) {
        this.selectedColumns.forEach(x => x.disable = false);
        this.selectedColumns = [...this.selectedColumns];
      }
    }
  }

  // ngOnChanges() {
  //   if (this.data) {
  //     this.clientSide = true;
  //     this.tableCore.pageOptions.count = this.data.length;
  //   }
  //   this.getDataFromService();
  // }

  ngOnDestroy() {
    this.tableCore.searchNew$.next({});
    this.tableCore.search = '';
    this.tableCore.pageOptions = {
      count: -1,
      offset: 0,
      limit: 10,
      sortDirection: 'asc',
      sortField: 'id'
    };
    this.firstInit = false;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Get the Table Data from the Service
   */
  getTableData(): void {
    if (this.url && this.url.getAll) {
      this.tableCore
        .getAllData(this.url.getAll)
        .pipe(take(1))
        .subscribe(() => {
          this.data = this.tableCore.tableData;
        });
    }
  }

  getDataFromService() {
    if (!this.clientSide) {
      this.getTableData();
    }
  }

  buildEditableForm() {
    if (!this.options.editable) { return; }
    this.columnFormArray = this.fb.array([]);
  }

  createRowFormArray() {
    return this.fb.group({});
  }

  /**
   * Create Array of strings from selected columns
   */
  updateSelectedColumnsAPI(): void {
    this.filteredArray = [];
    this.selectedColumns.map(col => this.filteredArray.push(col.field));
  }

  /**
   * Delete a Single Item from the Table
   */
  delete(id: string): void {
    if (this.url.delete) {
      this.tableCore
        .deleteItem(this.url.delete, id)
        .pipe(
          take(1),
          finalize(() => this.getTableData())
        )
        .subscribe();
    }
  }

  openDeleteDialog(id): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id }
    });

    dialogRef.onClose.subscribe((result) => {
      if (result.data == null || result.data === undefined) {
        return;
      }
      if (result.data === true) {

        this.delete(id);
      }
      if (result.data === false) {

        return;
      }
    });
  }

  // export server side
  export(): void {
    if (this.url.export) {
      this.tableCore
        .exportTable(this.url.export, this.filteredArray)
        .subscribe();
    }
  }

  /**
   * Fire When The Table Page Changes
   */
  setPage(pageInfo: any): void {
    this.tableCore.pageOptions.offset = pageInfo.first / pageInfo.rows + 1;
    this.tableCore.pageOptions.limit = pageInfo.rows;
    this.getTableData();
  }
  /**
   * Fire on sort
   */
  customSort(event?: any) {
    this.tableCore.pageOptions.sortField = event.field;
    this.tableCore.pageOptions.sortDirection = event.order == 1 ? 'ascending' : 'descending';
    this.tableCore.pageOptions.offset = 0;
    this.getTableData();
  }

  /**
   * Search For Each Table Column
   */
  columnSearchHandle(searchValue: any, colId: string): void {
    console.log(colId, ":", searchValue);

    this.tableCore.pageOptions.offset = 0;
    this.tableCore.searchNew$.next(this.tableCore.filter[colId] = searchValue);

  }

  /**
   * Search Functionality for Each Column with typing
   * Then call the backend to get the matched search criteria
   */
  columnSearchInput(): void {
    this.tableCore.searchNew$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (!this.clientSide) {
          this.firstInit ? this.getTableData() : (this.firstInit = true);
        }
      });
  }

  addRow(row?: any) {
    this.add.emit(row);
  }
  openViewDetail(row?: any) {
    this.viewDetail.emit(row);
  }
  exportExcel(): void {
    let rtl = false;
    this.getXlsxPrintableColumnsData();
    if (this.localize.lang === 'ar') {
      rtl = true;
    } else {
      rtl = false;
    }
    this.excelService.exportAsExcelFile(this.columnData, this.tableData.name, rtl);
  }
  exportPdf(): void {
    this.getPdfColumnHeaders();
    let data = this.getPrintableColumnsData();
    const font = fedra;
    let doc = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    doc.addFileToVFS('fedra-Regular.ttf', font);
    doc.addFont('fedra-Regular.ttf', 'fedra', 'normal');
    doc.setFont('fedra');
    doc.autoTable({
      headStyles: { fontStyle: 'fedra' },
      head: [this.columnsHeaders],
      body: data,
      // theme: 'grid',
      styles: { font: 'fedra' },
      columnStyles: { font: 'fedra' },
    });

    doc.text(0, 10, this.tableData.name, { lang: 'ar', align: 'right' });
    doc.save(`${this.tableData.name}.pdf`);

  }

  getPdfColumnHeaders() {
    this.columnsHeaders = [];

    this.selectedColumns
      .filter(col => col.print == true)
      .map(col => this.columnsHeaders.push(this.localize.translate.instant(col.header)));
    if (this.localize.lang == 'ar') {
      this.columnsHeaders = [...this.columnsHeaders].reverse();
    } else {
      this.columnsHeaders = [...this.columnsHeaders];
    }
  }
  getXlsxColumnHeaders() {
    this.columnsHeaders = [];

    this.selectedColumns
      .filter(col => col.print == true)
      .map(col => this.columnsHeaders.push(this.localize.translate.instant(col.header)));
  }
  getPrintableColumnsData() {
    this.columnData = [...this.data.map(data => {
      let row = [] as any[];
      this.columns.forEach(e => {
        if (e.print) {
          row.push(data[e.field]);
        }
      });
      if (this.localize.lang === 'ar') {
        row = [...row].reverse();
      }
      return [...row];
    })];

    return this.columnData;
  }
  getXlsxPrintableColumnsData() {
    this.columnData = [...this.data.map(data => {
      let row = [] as any[];
      this.columns.forEach(e => {
        if (e.print) {
          row.push(data[e.field]);
        }
      });
      return [...row];
    })];
    this.getXlsxColumnHeaders();
    this.columnData.unshift(this.columnsHeaders);
    return this.columnData;
  }
}

// please don't remove this for now
// list of last changes i made to grid code

// 1- i changed the binding property in html instead of data its tablecode.tabledata to make use of the same property in reRender method

// 2- removed reRender method from datatable component and added it ti service to be used in base edit component
