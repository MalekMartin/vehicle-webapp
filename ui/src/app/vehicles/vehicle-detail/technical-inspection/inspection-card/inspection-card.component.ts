import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inspection } from '../inspection';
import * as moment from 'moment';
import { TechnicalInspectionService } from '../technical-inspection.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
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
    @Output() deleted = new EventEmitter();
    @Output() edited = new EventEmitter();

    start: string;
    now: string;
    end: string;

    valid = false;

    constructor(private _service: TechnicalInspectionService,
                private _toastr: ToastsManager,
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

    delete(i: Inspection) {
        return this._service
                .deleteInspection(i)
                .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    edit(i: Inspection) {
        this.edited.emit(i);
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Technická kontrolo byla odstraněna.','Smazáno');
        this.deleted.emit();
    }

    private _onDeleteError = () => {
        this._toastr.error('Chyba při mazání technické kontroly','Chyba');
    }
}
