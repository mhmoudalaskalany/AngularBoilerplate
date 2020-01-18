import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TokenInterceptor } from './modules/core/services/interceptors/tokenInterceptor';
import { SharedModule } from './modules/shared/shared.module';
import { LoginComponent } from './modules/login/login.component';
import { CoreModule } from './modules/core/core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpModule } from '@angular/http';
import { ConfigModule } from 'ngx-envconfig';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ToastrModule.forRoot(),
    ConfigModule.forRoot(environment),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    // { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
