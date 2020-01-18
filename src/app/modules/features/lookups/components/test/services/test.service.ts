import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/modules/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TestService extends HttpService {
  protected get baseUrl(): string {
    return 'Countries/';
  }

  getLookup(): Observable<any> {
     return this.http.get(this.serverUrl + 'Countries/GetAll');
  }
}
