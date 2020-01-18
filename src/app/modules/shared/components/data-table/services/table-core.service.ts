import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoadOpts } from '../models/LoadOpts';
import { AlertService } from 'src/app/modules/core/services/alert/alert.service';
import { HttpService } from 'src/app/modules/core/services/http/http.service';
import { Shell } from 'src/app/modules/base/components/shell';

@Injectable({
  providedIn: 'root'
})
export class TableCoreService {
  public pageOptions: LoadOpts = {
    count: -1,
    offset: 1,
    limit: 5,
    sortDirection : 'ascending',
    sortField: 'id'

  };

  public search: string;
  public filter: any = {};
  public searchNew: {};
  public searchNew$: BehaviorSubject<{}> = new BehaviorSubject({});

  public tableData: any[] = [];
  get alertService(): AlertService {  return Shell.Injector.get(AlertService); }
  constructor(private http: HttpService) { }

  /**
   * Get The Grid data from a givin link to the endpoint
   */
  getAllData(url: string): Observable<any> {
    this.tableData = [];
    const options = {
      limit: this.pageOptions.limit,
      offset: this.pageOptions.offset == 0 ? 1 : this.pageOptions.offset,
      sortDirection : this.pageOptions.sortDirection,
      sortField : this.pageOptions.sortField
    };
    return this.http.postQueryParamsReq(url, this.filter, options).pipe(
      take(1),
      map((resp: any) => {
        this.tableData = resp.list;
        console.log('response in table service', resp.list);
        this.pageOptions.count = resp.count;
        // i think this cause the error of paging so i have to decrase it by 1 in base edit component
        this.pageOptions.offset = options.offset + 1;
        this.pageOptions = { ...this.pageOptions };

      })
    );
  }

  reRenderTable(url: string): void {
    this.tableData = [];
    this.getAllData(url)
      .pipe(take(1))
      .subscribe( () => {} );
  }

  /**
   * Delete Single Item with given URL and Item ID
   */
  deleteItem(url: string, id: string): Observable<any> {
    return this.http.deleteReq(url, id).pipe(
      take(1),
      map((resp: any) => {
          this.alertService.showError('Deleted Successfully');
          --this.pageOptions.offset;
      })
    );
  }

  /**
   * Delete Selected Items with given URL and Items IDs
   */
  deleteSelectedItems(url: string, ids: number[]): Observable<any> {
    return this.http.putReq(url, ids).pipe(
      take(1),
      map((resp: any) => {
        if (!resp.success) { return; }
      })
    );
  }

  /**
   * Export the table content
   */
  exportTable(url: string, selectedColumns: string[]): Observable<any> {
    return this.http
      .postReq(url, {
        visableColumns: selectedColumns,
        search: this.searchNew$.value
      })
      .pipe(
        take(1),
        map((resp: any) => {
          if (!resp.success) {
            return;
          }
          window.location.href = 'http://' + resp.data;
        })
      );
  }

}
