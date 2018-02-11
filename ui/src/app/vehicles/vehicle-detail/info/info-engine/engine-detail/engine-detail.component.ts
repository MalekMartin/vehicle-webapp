import { Component, OnInit, Input } from '@angular/core';
import { Engine } from '../../../_core/engine';

@Component({
    selector: 'va-engine-detail',
    templateUrl: './engine-detail.component.html',
    styleUrls: ['./engine-detail.component.scss']
})
export class EngineDetailComponent implements OnInit {

    @Input() engine:Engine;

    constructor() { }

    ngOnInit() { }
}
