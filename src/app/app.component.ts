import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from './modules/base/components/BaseComponent';
import { LocalizationService } from './modules/core/services/localization/localization.service';
import { Shell } from './modules/base/components/shell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(
    public inj: Injector,
    public localizationService: LocalizationService
  ) {
    super();
    Shell.Injector = inj;


  }

  ngOnInit() {
    this.localizationService.setDefaultLanguage();
  }
}
