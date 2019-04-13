import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { Interval } from '../../../../../shared/api/maintenance/interval.interface';

@Component({
    selector: 'va-interval-card',
    templateUrl: './interval-card.component.html',
    styleUrls: ['./interval-card.component.scss']
})
export class IntervalCardComponent implements OnInit {

    @Input() interval: Interval;

    @Output() editClicked = new EventEmitter();

    @Output() deleteClicked = new EventEmitter();

    constructor(private _vehicles: VehicleService) { }

    ngOnInit() { }

    get units(): string {
        return this._vehicles.units;
    }

    get units2(): string {
        return this._vehicles.units2;
    }

    edit() {
        this.editClicked.emit(this.interval);
    }

    delete() {
        this.deleteClicked.emit(this.interval.id);
    }
}
