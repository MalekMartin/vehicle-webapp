import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'va-vehicle-event',
    templateUrl: 'vehicle-event.component.html',
    styleUrls: ['vehicle-event.component.scss']
})

export class VehicleEventComponent implements OnInit {

    private _event: any;

    @Input() set event(v:any) {
        if (v) {
            this._event = v;
        }
    }

    constructor() { }

    ngOnInit() { }

    get event() {
        return this._event;
    }
}
