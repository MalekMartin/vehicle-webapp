import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Maintenance } from '../../../../../shared/api/maintenance/maintenance.interface';

@Component({
    selector: 'va-maintenance-card',
    templateUrl: './maintenance-card.component.html',
    styleUrls: ['./maintenance-card.component.scss'],
    animations: [
        trigger('toggle', [
            state('closed', style({ width: '0px', opacity: 0, display: 'none' })),
            state('opened', style({ width: AUTO_STYLE, opacity: 1, display: 'inline-block' })),
            transition('closed <=> opened', animate('300ms ease'))
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
    @Output() selectionChanged = new EventEmitter();

    start: string;
    now: string;
    end: string;

    checkboxState = 'closed';

    control = new FormControl();

    private _showCheckbox = false;
    private _onDestroy$ = new Subject();

    ngOnInit() {
        this.start = moment(this.maintenance.date).format('X');
        this.now = moment().format('X');
        this.end = moment(this.maintenance.expirations.date).format('X');

        this.control.valueChanges.pipe(takeUntil(this._onDestroy$)).subscribe(v => {
            this.toggleSelect(v);
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
            if (
                this.maintenance.expirations.odo < this.maintenance.currents.odo &&
                this.maintenance.interval.odo > 0
            )
                return true;
            if (
                this.maintenance.expirations.odo2 < this.maintenance.currents.odo2 &&
                this.maintenance.interval.odo2 > 0
            )
                return true;
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

    toggleSelect(v: boolean) {
        this.selectionChanged.emit(v);
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
