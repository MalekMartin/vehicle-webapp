import { Component, OnInit } from '@angular/core';
import { HttpService } from '../core/http.service';

@Component({
    selector: 'va-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

    private _events:any;

    constructor(private _http:HttpService) { }

    ngOnInit() {
        this._http.get('/resource/events')
            .subscribe((e:any) => {
                this._events = e;
            });
    }

    get events() {
        return this._events;
    }
}
