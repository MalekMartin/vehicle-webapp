import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Fuel } from '../../../../shared/api/fuel/fuel';
import { MomentPipe } from '../../../../shared/pipes/moment.pipe';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ConfirmService } from '../../../../shared/components/confirm/confirm.service';

@Component({
    selector: 'va-fuel-card',
    templateUrl: './fuel-card.component.html',
    styleUrls: ['./fuel-card.component.scss']
})
export class FuelCardComponent implements OnInit, OnDestroy {
    @Input() fuel: Fuel;
    @Output() edit = new EventEmitter<Fuel>();
    @Output() deleted = new EventEmitter();

    units: string;
    units2: string;
    tankCapacity: number;

    private _onDestroy$ = new Subject();

    constructor(
        private _moment: MomentPipe,
        private _vehicles: VehicleService,
        private confirm: ConfirmService,
    ) {}

    ngOnInit() {
        this._vehicles.vehicle
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.info.units;
                this.units2 = v.info.subUnits;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    delete() {
        const message = 'Opravdu chceš smazat tankování ' +
            this.fuel.quantity +
            'l ze dne ' +
            this._moment.transform(this.fuel.date, 'DD.MM.YYYY') +
            '?';
        this.confirm.open(message, '', 'Ano, smazat', 'Ne')
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(res => {
                if (!!res) {
                    this.deleted.emit(this.fuel);
                }
            });
    }

    updateModel(fuel: Fuel) {
        return {
            id: fuel.id,
            vehicleId: fuel.vehicleId,
            date: fuel.date,
            quantity: fuel.quantity,
            pricePerLiter: fuel.pricePerLiter,
            price: fuel.price,
            odo: fuel.odo,
            odo2: fuel.odo2,
            fullTank: fuel.fullTank,
            note: fuel.note
        };
    }
}
