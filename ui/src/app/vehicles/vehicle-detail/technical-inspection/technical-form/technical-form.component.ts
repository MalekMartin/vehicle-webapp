import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Technical } from '../technical';
import { Station } from '../station';
import { TechnicalInspectionService } from '../technical-inspection.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { VehicleService } from '../../../vehicle-stream/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'va-technical-form',
    templateUrl: './technical-form.component.html',
    styleUrls: ['./technical-form.component.scss']
})
export class TechnicalFormComponent implements OnInit, OnDestroy {

    // @Input() set ti(t: Technical) {
    //     if (t) {
    //         this._ti = t;
    //         this.form.setValue({
    //             id: t.id,
    //             vehicleId: t.vehicleId,
    //             date: t.date,
    //             expirationDate: t.expirationDate,
    //             repeated: t.repeated,
    //             note: t.note,
    //             stationId: t.stationId,
    //             price: t.price,
    //             odo: t.odo,
    //             odo2: t.odo2
    //         });
    //     }
    // }
    // @Input() allStations: Station[];
    // @Input() set vehicleId(id: string) {
    //     if (id) {
    //         this._vehicleId = id;
    //         this.form.patchValue({vehicleId: id});
    //     }
    // }
    vehicleId: string;
    id: string;
    allStations: Station[];

    form = this._form.group({
        id: [''],
        vehicleId: [this.vehicleId],
        date: ['', Validators.required],
        expirationDate: ['', Validators.required],
        repeated: [''],
        note: ['', Validators.maxLength(255)],
        stationId: [''],
        price: ['0', Validators.required],
        odo: ['0'],
        odo2: ['0']
    });

    private _vehicleId: string;
    private _ti: Technical;

    private _routeSubs: Subscription;
    private _stationsSubs: Subscription;
    private _inspectionSubs: Subscription;

    constructor(private _form: FormBuilder,
                private _service: TechnicalInspectionService,
                private _toastr: ToastsManager,
                private _vehicles: VehicleService,
                private _route: ActivatedRoute,
                private _router: Router) { }

    ngOnInit() {
        this._routeSubs = this._route
            .params
            .subscribe(par => {
                if (par['vehicleId']) {
                    this.vehicleId = par['vehicleId'];
                    this.form.get('vehicleId').setValue(this.vehicleId);
                }

                if (par['id']) {
                    this.id = par['id'];
                    this.getInspection(this.id);
                }
            });
        this.getStations();
    }

    ngOnDestroy() {
        if (this._routeSubs) {
            this._routeSubs.unsubscribe();
        }
        if (this._inspectionSubs) {
            this._inspectionSubs.unsubscribe();
        }
        if (this._stationsSubs) {
            this._stationsSubs.unsubscribe();
        }
    }

    getInspection(id: string) {
        this._inspectionSubs = this._service.getInspection(id)
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
        // this.stationLoading = true;
        this._stationsSubs = this._service
            .getStations()
            .subscribe((s:Station[]) => {
                this.allStations = s;
                // this.stationLoading = false;
            });
    }

    // get vehicleId(): string {
    //     return this._vehicleId;
    // }

    get ti(): Technical {
        return this._ti;
    }

    get stations(): Station[] {
        // return this.allStations;
        return [];
    }

    get units(): string {
        return this._vehicles.units;
    }

    get subUnits(): string {
        return this._vehicles.Units2;
    }

    save() {
        this._service
            .saveInspection(this.form.value)
            .subscribe(() => {
                this._toastr.success('TK úspěšně uložena','Uloženo');
                this._router.navigate(['./'], {relativeTo: this._route.parent.parent, queryParams: { itemChanged: true }});
            });
    }

    cancel() {
        if (this.vehicleId) {
            this._router.navigate(['/vehicle/' + this.vehicleId + '/technical']);
        } else {
            this._router.navigate(['./'], {relativeTo: this._route.parent.parent});
        }
    }

}
