import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tire } from '../tires.interface';
import { Observable } from 'rxjs/Rx';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { VehicleService } from '../../../vehicle-stream/vehicle.service';

@Component({
    selector: 'va-tire-status-form',
    templateUrl: './tire-status-form.component.html',
    styleUrls: ['./tire-status-form.component.scss']
})
export class TireStatusFormComponent implements AfterViewInit, OnDestroy {

    @ViewChild('dialog') dialog: ModalDirective;
    @ViewChild('btnClose') btnClose: ElementRef;
    @ViewChild('btnCancel') btnCancel: ElementRef;
    @ViewChild('btnOk') btnOk: ElementRef;
    modalSubscription: Subscription;

    @Input() set tire(t:any) {
        this._tire = t;
        this.form.reset({engineHours: 0});
        if (this.tire && this.tire.tire) {
            this.updatedTire = this.tire.tire;
            this.newStatus = this.tire.status;
        }
    }
    @Output() canceled = new EventEmitter();
    @Output() saved = new EventEmitter();

    updatedTire:Tire;
    newStatus:string;

    form = this._forms.group({
        odo: ['0', Validators.required],
        odo2: ['0', Validators.required],
        date: ['']
    });

    odo = 0;
    odo2 = 0;

    newOdo:number;
    newOdo2:number;

    private _tire;

    constructor(private _forms: FormBuilder,
                private _vehicles: VehicleService) { }

    subscribeToDialog(): Observable<boolean> {

        return Observable.create(observer => {
            const close$ = Observable.fromEvent(this.btnClose.nativeElement, 'click');
            const cancel$ = Observable.fromEvent(this.btnCancel.nativeElement, 'click');
            const ok$ = Observable.fromEvent(this.btnOk.nativeElement, 'click');

            this.modalSubscription = Observable.merge(
                close$.mapTo(false),
                cancel$.mapTo(false),
                ok$.mapTo(true),
                this.dialog.onHidden.asObservable().mapTo(false)
            ).subscribe(result => {
                this.dialog.hide();
                observer.next({tire: this.save(), result: result});
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

    get tire(): any {
        return this._tire;
    }

    get units(): string {
        return this._vehicles.units;
    }

    get units2(): string {
        return this._vehicles.Units2;
    }

    cancel() {
        this.form.reset({odo2: 0});
        this.canceled.emit();
    }

    save(): any {
        this.updatedTire.status = this.newStatus;
        if (this.newStatus === 'STOCK') {
            this.updatedTire.tireOdo = this.calculateMileage;
            this.updatedTire.tireOdo2 = this.calculateEngineHours;
        }
        this.updatedTire.odo = this.form.value.odo;
        this.updatedTire.odo2 = this.form.value.odo2;
        if (this.newStatus === 'STOCK') {
            if (this.updatedTire.odo >= this.odo) {
                return {tire: this.updatedTire, date: this.form.value.date};
            }
        } else {
            return {tire: this.updatedTire, date: this.form.value.date};
        }
    }

    get calculateMileage() {
        const milesOnTire = Number(this.updatedTire.tireOdo) || 0;
        const lastMileage = Number(this.updatedTire.odo) || 0;
        const mileage = Number(this.odo) || 0;

        const p = mileage - lastMileage;
        const res = milesOnTire + p;

        return res < 0 ? 0 : res;
    }

    get calculateEngineHours() {
        const hoursOnTire = Number(this.updatedTire.tireOdo2) || 0;
        const lastHours = Number(this.updatedTire.odo2) || 0;
        const hours = Number(this.odo2) || 0;
        const res = hoursOnTire + (hours - lastHours);
        return res < 0 ? 0 : res;
    }
}
