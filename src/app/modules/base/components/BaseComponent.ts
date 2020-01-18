import { Shell } from './shell';
import { LocalizationService } from '../../core/services/localization/localization.service';
import { AlertService } from '../../core/services/alert/alert.service';
import { DataService } from '../../core/services/shared';
import { APIs } from '../../core/services/APIs';
export abstract class BaseComponent {

    get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
    get alertService(): AlertService { return Shell.Injector.get(AlertService); }
    get service(): DataService { return Shell.Injector.get(DataService); }
    get APIs(): APIs { return Shell.Injector.get(APIs); }
    dir = 'dir';
    constructor() {

    }
}
