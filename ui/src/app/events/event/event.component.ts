import { Component, Input } from '@angular/core';

@Component({
    selector: 'va-event',
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.scss']
})

export class EventComponent {

    private _event: any;

    @Input() set event(e: any) {
        if (!!e) {
            this._event = e;
        }
    }

    constructor() { }

    get event() {
        return this._event;
    }
}
