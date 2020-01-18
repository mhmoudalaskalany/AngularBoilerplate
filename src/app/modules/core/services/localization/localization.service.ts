import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class LocalizationService {
  public lang: any;
  public translate: TranslateService;
  constructor(private translateService: TranslateService) {
    this.translate = translateService;
   }

  async setDefaultLanguage() {
    this.lang = await localStorage.getItem('language');
    this.translate.addLangs(['en', 'fr', 'ar']);
    this.translate.setDefaultLang('en');
    const browserLang = this.lang ? this.lang : this.translate.getBrowserLang();
    await this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'en');
    this.translate.get('HOME.arr').subscribe((text: string) => { (text); });
  }

  changeLang(lang) {
    this.lang = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

}
