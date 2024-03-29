import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inspection } from '../inspection.interface';
import * as moment from 'moment';
import { TechnicalInspectionService } from '../technical-inspection.service';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';

@Component({
    selector: 'va-inspection-card',
    templateUrl: './inspection-card.component.html',
    styleUrls: ['./inspection-card.component.scss']
})
export class InspectionCardComponent implements OnInit {

    @Input() inspection: Inspection;
    @Input() units: string;
    @Input() units2: string;
    @Output() delete = new EventEmitter<Inspection>();
    @Output() edit = new EventEmitter<Inspection>();

    start: string;
    now: string;
    end: string;

    valid = false;

    constructor(private _service: TechnicalInspectionService,
                private _toastr: ToastrService,
                private _vehicles: VehicleService) { }

    ngOnInit() {
        this.start = moment(this.inspection.date).format('X');
        this.now = moment().format('X');
        this.end = moment(this.inspection.expirationDate).format('X');
    }

    get isValid() {
        return moment().isBefore(moment(this.inspection.expirationDate));
    }

    get isExpiring() {
        const duration = Number(this.end) - Number(this.now);
        return (duration < 2592000 && duration > 0) ? true : false;
    }

    get isExpired() {
        const duration = Number(this.now) - Number(this.end);
        return (duration >= 0) ? true : false;
    }
}
