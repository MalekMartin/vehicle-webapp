import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { mapTo, takeUntil } from 'rxjs/operators';
import { Garage } from '../../../../car-services/garage-form/garage-form.component';
import { GarageService } from '../../../../car-services/garage/garage.service';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { VValidators } from '../../../../shared/forms/validators';
import { RepairService } from '../repair.service';

@Component({
    selector: 'va-repair-form',
    templateUrl: './repair-form.component.html',
    styleUrls: ['./repair-form.component.scss']
})
export class RepairFormComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('dialog') dialog: ModalDirective;
    @ViewChild('btnClose') btnClose: ElementRef;
    @ViewChild('btnCancel') btnCancel: ElementRef;
    @ViewChild('btnSave') btnSave: ElementRef;

    modalSubscription: Subscription;
    title: string;
    showTax: boolean;

    form = this._form.group({
        id: [''],
        vehicleId: ['', Validators.required],
        title: ['', Validators.required],
        odo: [0, [Validators.required, VValidators.validateNumber]],
        odo2: [0, [Validators.required, VValidators.validateNumber]],
        date: ['', Validators.required],
        garageId: [null, Validators.required],
        totalPrice: 0,
        notes: '',
        tax: 0,
        taxToggle: [false]
    });

    garages: Garage[];

    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        private _services: GarageService,
        private _service: RepairService,
        private _toastr: ToastsManager,
        private _vehicles: VehicleService
    ) {}

    ngOnInit() {
        this._services
            .getGarages()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((g: Garage[]) => {
                this.garages = g;
            });

        this._vehicles.state
            .select(s => s.vehicle)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.info.units;
                this.units2 = v.info.subUnits;
            });
    }

    ngAfterViewInit() {
        this.dialog.show();
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    subscribeToDialog(): Observable<boolean> {
        return Observable.create(observer => {
            const close$ = fromEvent(this.btnClose.nativeElement, 'click');
            const cancel$ = fromEvent(this.btnCancel.nativeElement, 'click');
            const save$ = fromEvent(this.btnSave.nativeElement, 'click');

            merge(
                close$.pipe(mapTo(false)),
                cancel$.pipe(mapTo(false)),
                save$.pipe(mapTo(true)),
                this.dialog.onHidden.asObservable().pipe(mapTo(false))
            )
                .pipe(takeUntil(this._onDestroy$))
                .subscribe(result => {
                    this.dialog.hide();
                    observer.next(result);
                });
        });
    }

    save() {
        const repair = this.form.value;
        repair.garageId = !!repair.garageId ? repair.garageId : null;
        this._service
            .update(repair)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

    private _onSaveSuccess = () => {
        this._toastr.success('Oprava uložena');
        this.dialog.hide();
    };

    private _onSaveError = () => {
        this._toastr.error('Chyba při ukládání');
    };
}
