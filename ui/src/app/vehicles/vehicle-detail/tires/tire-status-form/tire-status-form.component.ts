import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { Tire, TireStatus } from '../tires.interface';
import { TiresService } from '../core/tires.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'va-tire-status-form',
    templateUrl: './tire-status-form.component.html',
    styleUrls: ['./tire-status-form.component.scss']
})
export class TireStatusFormComponent implements OnInit, OnDestroy {
    updatedTire: Tire;
    newStatus: string;

    form = this._forms.group({
        odo: ['0', Validators.required],
        odo2: ['0', Validators.required],
        date: ['', Validators.required]
    });

    newOdo: number;
    newOdo2: number;
    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    constructor(
        private _forms: FormBuilder,
        private _vehicles: VehicleService,
        private _tireService: TiresService,
        private _toastr: ToastrService,
        private _dialogRef: MatDialogRef<TireStatusFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { tire: Tire; status: TireStatus }
    ) {}

    ngOnInit() {
        this._vehicles.vehicle
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.info.units;
                this.units2 = v.info.subUnits;
            });

        this.form
            .get('odo')
            .valueChanges.pipe(takeUntil(this._onDestroy$))
            .subscribe(val => {
                this.newOdo = this.calculateTireOdo(
                    val,
                    this.data.tire.odo || 0,
                    this.data.tire.tireOdo || 0
                );
            });

        this.form
            .get('odo2')
            .valueChanges.pipe(takeUntil(this._onDestroy$))
            .subscribe(val => {
                this.newOdo2 = this.calculateTireOdo(
                    val,
                    this.data.tire.odo2 || 0,
                    this.data.tire.tireOdo2 || 0
                );
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        if (this.form.get('odo').value < this.data.tire.odo) {
            return;
        }
        if (!!this.units2 && this.form.get('odo2').value < this.data.tire.odo2) {
            return;
        }

        const tire: Tire = {
            ...this.data.tire,
            status: this.data.status,
            tireOdo: this.data.status === 'STOCK' ? this.newOdo : this.data.tire.tireOdo,
            tireOdo2: this.data.status === 'STOCK' ? this.newOdo2 : this.data.tire.tireOdo2,
            odo: this.form.get('odo').value,
            odo2: this.form.get('odo2').value
        };

        this.changeStatus(tire, this.form.get('date').value);
        // this.updatedTire.status = this.newStatus;
        // if (this.newStatus === 'STOCK') {
        //     this.updatedTire.tireOdo = this.calculateMileage;
        //     this.updatedTire.tireOdo2 = this.calculateEngineHours;
        // }
        // this.updatedTire.odo = this.form.get('odo').value;
        // this.updatedTire.odo2 = this.form.get('odo2').value;
        // if (this.newStatus === 'STOCK') {
        //     if (this.updatedTire.odo >= this.form.get('odo').value) {
        //         return { tire: this.updatedTire, date: this.form.get('date').value };
        //     }
        // } else {
        //     return { tire: this.updatedTire, date: this.form.get('date').value };
        // }
    }

    calculateTireOdo(odo: number, lastOdo: number, tireOdo: number): number {
        const p = Number(odo) - Number(lastOdo);
        const res = Number(tireOdo) + p;
        return res < 0 ? 0 : res;
    }

    changeStatus(tire: Tire, date: string) {
        this._tireService.state.update(f => f.updateTire, tire);
        this._tireService
            .change({ tire, date })
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(
                () => {
                    this._toastr.success('Stav pneumatiky byl úspěšně změněn.', 'Uloženo!');
                    this._dialogRef.close();
                },
                () => {
                    this._toastr.error('Stav pneumatiky se nepodařilo změnit.', 'Chyba!');
                    this._tireService.state.update(f => f.updateTire, this.data.tire);
                }
            );
    }
}
