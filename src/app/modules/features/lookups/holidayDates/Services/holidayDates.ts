import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpService } from 'src/app/modules/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayDatesService extends HttpService {
  protected get baseUrl(): string {
    return 'HolidayDates/';
  }
  getCountries(): Observable<any> {
    
    return this.http.get(this.serverUrl + 'Countries/GetAll');
  }
  getHolidaies(): Observable<any> {
    return this.http.get(this.serverUrl + 'Holidays/GetAll');
  }
  getLookup():Observable<any>{
    const sources = [];
    sources.push(this.getCountries());
    sources.push(this.getHolidaies());
    return forkJoin(sources);
  }
}
