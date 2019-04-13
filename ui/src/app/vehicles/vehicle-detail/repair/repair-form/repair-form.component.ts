import {
    Component,
    Output,
    EventEmitter,
    Input,
    ViewChild,
    ElementRef,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VValidators } from '../../../../shared/forms/validators';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription ,  Observable, fromEvent, merge } from 'rxjs';
import { Repair } from '../_core/repair.interface';
import { GarageService } from '../../../../car-services/garage/garage.service';
import { OnInit } from '@angular/core';
import { RepairService } from '../repair.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { trigger } from '@angular/animations';
import { VehicleService } from '../../../vehicle-stream/vehicle.service';
import { Garage } from '../../../../car-services/garage-form/garage-form.component';
import { mapTo } from 'rxjs/operators';

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

    private _garages: Garage[];
    private _onHiddenResult = false;

    constructor(private _form:FormBuilder,
                private _services: GarageService,
                private _service: RepairService,
                private _toastr: ToastsManager,
                private _vehicles: VehicleService) { }

    ngOnInit() {
        this._services
            .getGarages()
            .subscribe((g: Garage[]) => {
                this._garages = g;
            });
    }

    get garages() {
        return this._garages;
    }

    get units(): string {
        return this._vehicles.units;
    }

    get units2(): string {
        return this._vehicles.Units2;
    }

    subscribeToDialog(): Observable<boolean> {
        return Observable.create(observer => {
            const close$ = fromEvent(this.btnClose.nativeElement, 'click');
            const cancel$ = fromEvent(this.btnCancel.nativeElement, 'click');
            const save$ = fromEvent(this.btnSave.nativeElement, 'click');

            this.modalSubscription = merge(
                close$.pipe(mapTo(false)),
                cancel$.pipe(mapTo(false)),
                save$.pipe(mapTo(true)),
                this.dialog.onHidden.asObservable().pipe(mapTo(false))
            ).subscribe(result => {
                this.dialog.hide();
                observer.next(result);
            });
        });
    }

    ngAfterViewInit() {
        this.dialog.show();
    }

    ngOnDestroy() {
        if (this.modalSubscription) {
            this.modalSubscription.unsubscribe();
        }
    }

    save() {
        const repair = this.form.value;
        repair.garageId = !!repair.garageId ? repair.garageId : null;
        this._service
            .update(repair)
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

    private _onSaveSuccess = () => {
        this._toastr.success('Oprava uložena');
        this.dialog.hide();
    }

    private _onSaveError = () => {
        this._toastr.error('Chyba při ukládání');
    }
}
