import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { trigger, state, AUTO_STYLE, style, animate, transition } from '@angular/animations';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { Maintenance } from '../../../../../shared/api/maintenance/maintenance.interface';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'va-maintenance-card',
    templateUrl: './maintenance-card.component.html',
    styleUrls: ['./maintenance-card.component.scss'],
    animations: [
        trigger('toggle', [
            state('closed', style({width: '0px', opacity: 0, display: 'none'})),
            state('opened', style({width: AUTO_STYLE, opacity: 1, display: 'inline-block'})),
            transition('closed <=> opened', animate('300ms ease')),
        ])
    ]
})
export class MaintenanceCardComponent implements OnInit, OnDestroy {

    @Input() maintenance: MaintenanceSelectable;

    @Input() value = false;

    @Input() set showCheckbox(v: boolean) {
        this._showCheckbox = v;
        this.checkboxState = v ? 'opened' : 'closed';
    }

    @Output() canceled = new EventEmitter();

    @Output() updateClicked = new EventEmitter();

    @Output() onSelected = new EventEmitter();
    @Output() onUnselected = new EventEmitter();

    start: string;
    now: string;
    end: string;

    checkboxState = 'closed';

    control = new FormControl();

    private _showCheckbox = false;
    private _onDestroy$ = new Subject();

    constructor(private _service: MaintenanceService,
                private _toastr: ToastsManager) { }

    ngOnInit() {
        this.start = moment(this.maintenance.date).format('X');
        this.now = moment().format('X');
        this.end = moment(this.maintenance.expirations.date).format('X');

        this.control.valueChanges
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.maintenance.selected = v;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get showCheckbox(): boolean {
        return this._showCheckbox;
    }

    get isExpired() {
        if (this.maintenance.status === 'IN_PROGRESS') {
            if (this.now > this.end && this.maintenance.interval.months > 0) return true;
            if (this.maintenance.expirations.odo < this.maintenance.currents.odo
                && this.maintenance.interval.odo > 0) return true;
            if (this.maintenance.expirations.odo2 < this.maintenance.currents.odo2
                && this.maintenance.interval.odo2 > 0) return true;
        }
        return false;
    }

    get canCancel() {
        return this.maintenance.status === 'IN_PROGRESS';
    }

    get canFinish() {
        return this.maintenance.status === 'IN_PROGRESS';
    }

    get canEdit() {
        return this.maintenance.status === 'IN_PROGRESS';
    }

    toggleSelect() {
        if (this.maintenance.selected) {
            this.onSelected.emit();
        } else {
            this.onUnselected.emit();
        }
    }

    update() {
        this.updateClicked.emit(this.maintenance);
    }

}

export interface MaintenanceOverview extends Maintenance {
    currents: VehicleCurrents;
    expirations: VehicleCurrents;

}

interface MaintenanceSelectable extends MaintenanceOverview {
    selected: boolean;
}

export interface VehicleCurrents {
    odo: number;
    odo2: number;
    date?: string;
}
