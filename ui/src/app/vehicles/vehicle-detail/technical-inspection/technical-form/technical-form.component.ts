import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { Station } from '../station';
import { Technical } from '../technical';
import { TechnicalInspectionService } from '../technical-inspection.service';

@Component({
    selector: 'va-technical-form',
    templateUrl: './technical-form.component.html',
    styleUrls: ['./technical-form.component.scss']
})
export class TechnicalFormComponent implements OnInit, OnDestroy {
    vehicleId: string;
    id: string;
    allStations: Station[];

    form = this._form.group({
        id: [''],
        vehicleId: [''],
        date: ['', Validators.required],
        expirationDate: ['', Validators.required],
        repeated: [''],
        note: ['', Validators.maxLength(255)],
        stationId: [''],
        price: ['0', Validators.required],
        odo: ['0'],
        odo2: ['0']
    });

    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        private _service: TechnicalInspectionService,
        private _toastr: ToastsManager,
        private _vehicles: VehicleService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this._route.params.pipe(takeUntil(this._onDestroy$)).subscribe(par => {
            if (par['id']) {
                this.id = par['id'];
                this.getInspection(this.id);
            }
        });

        this._vehicles.state
            .select(s => s.vehicle)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.info.units;
                this.units2 = v.info.subUnits;
                this.vehicleId = v.info.id;
                this.form.get('vehicleId').setValue(v.info.id);
            });

        this.getStations();
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    getInspection(id: string) {
        this._service
            .getInspection(id)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((t: Technical) => {
                this.form.setValue({
                    id: t.id,
                    vehicleId: t.vehicleId,
                    date: t.date,
                    expirationDate: t.expirationDate,
                    repeated: t.repeated,
                    note: t.note,
                    stationId: t.stationId,
                    price: t.price,
                    odo: t.odo,
                    odo2: t.odo2
                });
            });
    }

    getStations() {
        this._service
            .getStations()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((s: Station[]) => {
                this.allStations = s;
            });
    }

    save() {
        this._service
            .saveInspection(this.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => {
                this._toastr.success('TK úspěšně uložena', 'Uloženo');
                this._router.navigate(['./'], {
                    relativeTo: this._route.parent.parent,
                    queryParams: { itemChanged: true }
                });
            });
    }

    cancel() {
        if (this.vehicleId) {
            this._router.navigate(['/vehicle/' + this.vehicleId + '/technical']);
        } else {
            this._router.navigate(['./'], { relativeTo: this._route.parent.parent });
        }
    }
}
