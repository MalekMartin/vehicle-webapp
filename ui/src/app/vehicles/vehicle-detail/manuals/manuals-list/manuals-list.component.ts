import { Component, OnInit, Input } from '@angular/core';
import { Manual } from '../manual.interface';

@Component({
    selector: 'va-manuals-list',
    templateUrl: 'manuals-list.component.html',
    styleUrls: ['./manuals-list.component.scss']
})
export class ManualsListComponent implements OnInit {
    @Input() manuals: Manual[];

    constructor() {}

    ngOnInit() {}
}
