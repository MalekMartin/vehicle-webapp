import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    OnDestroy,
    AfterViewInit,
    OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tire } from '../tires.interface';
import { Observable, Subscription, fromEvent, merge, Subject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { mapTo, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'va-tire-status-form',
    templateUrl: './tire-status-form.component.html',
    styleUrls: ['./tire-status-form.component.scss']
})
export class TireStatusFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('dialog') dialog: ModalDirective;
    @ViewChild('btnClose') btnClose: ElementRef;
    @ViewChild('btnCancel') btnCancel: ElementRef;
    @ViewChild('btnOk') btnOk: ElementRef;
    modalSubscription: Subscription;

    @Input() set tire(t: any) {
        this._tire = t;
        this.form.reset({ engineHours: 0 });
        if (this.tire && this.tire.tire) {
            this.updatedTire = this.tire.tire;
            this.newStatus = this.tire.status;
        }
    }
    @Output() canceled = new EventEmitter();
    @Output() saved = new EventEmitter();

    updatedTire: Tire;
    newStatus: string;

    form = this._forms.group({
        odo: ['0', Validators.required],
        odo2: ['0', Validators.required],
        date: ['']
    });

    newOdo: number;
    newOdo2: number;
    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    private _tire;

    constructor(private _forms: FormBuilder, private _vehicles: VehicleService) {}

    ngOnInit() {
        this._vehicles.state
            .select(s => s.vehicle)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.info.units;
                this.units2 = v.info.subUnits;
            });
    }

    subscribeToDialog(): Observable<boolean> {
        return Observable.create(observer => {
            const close$ = fromEvent(this.btnClose.nativeElement, 'click');
            const cancel$ = fromEvent(this.btnCancel.nativeElement, 'click');
            const ok$ = fromEvent(this.btnOk.nativeElement, 'click');

            this.modalSubscription = merge(
                close$.pipe(mapTo(false)),
                cancel$.pipe(mapTo(false)),
                ok$.pipe(mapTo(true)),
                this.dialog.onHidden.pipe(mapTo(false))
            )
                .pipe(takeUntil(this._onDestroy$))
                .subscribe(result => {
                    this.dialog.hide();
                    observer.next({ tire: this.save(), result: result });
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

    cancel() {
        this.form.reset({ odo2: 0 });
        this.canceled.emit();
    }

    save(): any {
        this.updatedTire.status = this.newStatus;
        if (this.newStatus === 'STOCK') {
            this.updatedTire.tireOdo = this.calculateMileage;
            this.updatedTire.tireOdo2 = this.calculateEngineHours;
        }
        this.updatedTire.odo = this.form.get('odo').value;
        this.updatedTire.odo2 = this.form.get('odo2').value;
        if (this.newStatus === 'STOCK') {
            if (this.updatedTire.odo >= this.form.get('odo').value) {
                return { tire: this.updatedTire, date: this.form.get('date').value };
            }
        } else {
            return { tire: this.updatedTire, date: this.form.get('date').value };
        }
    }

    get calculateMileage() {
        const milesOnTire = Number(this.updatedTire.tireOdo) || 0;
        const lastMileage = Number(this.updatedTire.odo) || 0;
        const mileage = Number(this.form.get('odo')) || 0;

        const p = mileage - lastMileage;
        const res = milesOnTire + p;

        return res < 0 ? 0 : res;
    }

    get calculateEngineHours() {
        const hoursOnTire = Number(this.updatedTire.tireOdo2) || 0;
        const lastHours = Number(this.updatedTire.odo2) || 0;
        const hours = Number(this.form.get('odo2').value) || 0;
        const res = hoursOnTire + (hours - lastHours);
        return res < 0 ? 0 : res;
    }
}
