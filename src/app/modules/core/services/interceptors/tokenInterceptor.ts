import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { finalize } from 'rxjs/operators';
import { LocalizationService } from '../localization/localization.service';
import { LoaderService } from '../loader/loader.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public localize: LocalizationService, public loaderService: LoaderService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    let token = localStorage.getItem('token');
    let lang = this.localize.lang;
    switch (lang) {
      case 'ar': {
        lang = 'ar-EG'
        break;
      }
      case 'en': {
        lang = 'en-US'
        break;
      }
      case 'fr': {
        lang = 'fr-FR'
        break;
      }
      default: {
        lang = 'en-US'
        break;
      }
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        lang: lang ? lang : 'en-US'
      }
    });
    return next.handle(request).pipe(finalize(() => this.loaderService.hide()));
  }
}
