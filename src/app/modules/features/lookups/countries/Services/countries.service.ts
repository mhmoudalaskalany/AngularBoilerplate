import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/modules/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends HttpService {
  protected get baseUrl(): string {
    return 'Countries/';
  }
}
