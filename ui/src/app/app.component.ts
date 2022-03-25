import { Component, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'va-app',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor() {
        moment.locale('cs');
    }
}
