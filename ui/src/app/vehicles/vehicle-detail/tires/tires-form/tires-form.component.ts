import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TIRE_STATUSES } from '../core/tire-status';
import { Tire } from '../tires.interface';

@Component({
    selector: 'va-tires-form',
    templateUrl: './tires-form.component.html',
    styleUrls: ['./tires-form.component.scss']
})
export class TiresFormComponent implements OnInit {
    @Input() set tire(t: Tire) {
        this.form.reset();
        if (t) {
            this._tire = t;
            this.form.setValue(t);
        }
        if (!t) {
            this._tire = null;
            this.form.patchValue({ status: 'STOCK' });
        }
    }
    @Input() set vehicleId(id: string) {
        if (id) {
            this.form.patchValue({ vehicleId: id });
        }
    }

    @Output() canceled = new EventEmitter();
    @Output() saved = new EventEmitter();

    tireStatuses = TIRE_STATUSES;

    form = this._form.group({
        id: [''],
        vehicleId: ['', Validators.required],
        dot: ['', Validators.max(9999)],
        purchaseDate: [''],
        priceEach: ['', [Validators.required]],
        quantity: ['', [Validators.required, Validators.min(1)]],
        totalPrice: ['', Validators.required],
        description: ['', Validators.required],
        status: ['', Validators.required],
        brand: ['', Validators.required],
        model: ['', Validators.required],
        dimensions: ['', Validators.required],
        notes: [''],
        odo: ['0'],
        odo2: ['0'],
        tireOdo: ['0'],
        tireOdo2: ['0']
    });

    private _vehicleId: string;
    private _tire: Tire;

    constructor(private _form: FormBuilder) {}

    ngOnInit() {}

    get vehicleId(): string {
        return this._vehicleId;
    }

    get tire(): Tire {
        return this._tire;
    }

    // ngOnChanges() {
    //     this.form.reset();
    //     if (this.tire) {
    //         this.form.setValue(this.tire);
    //     }
    //     if (this.vehicleId) {
    //         this.form.controls['vehicleId'].setValue(this.vehicleId);
    //     }
    //     if (!this.tire) {
    //         this.form.controls['status'].setValue('STOCK');
    //     }
    // }

    cancel() {
        this.form.reset();
        this.canceled.emit();
    }

    save() {
        console.log(this.form.controls);
        this.saved.emit(this.form.value);
        // this.form.reset();
    }
}
