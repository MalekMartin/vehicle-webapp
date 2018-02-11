import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trade } from '../../../../../shared/api/trade/trade';

@Component({
    selector: 'va-trade-form',
    templateUrl: './trade-form.component.html',
    styleUrls: ['./trade-form.component.scss']
})
export class TradeFormComponent {

    @Input() type;
    @Input() set data(data: Trade) {
        this._data = data;
        this.form.setValue({
            vehicleId: data.vehicleId,
            company: data.company,
            address: data.address,
            city: data.city,
            zipCode: data.zipCode,
            phone: data.phone,
            email: data.email,
            contactPerson: data.contactPerson,
            notes: data.notes,
            date: data.date,
            price: data.price,
            odo: data.odo || 0,
            odo2: data.odo2 || 0
        });
    }
    @Output() updated = new EventEmitter();
    @Output() canceled = new EventEmitter();

    form = this._form.group({
        vehicleId: ['', Validators.required],
        company: ['',[Validators.required, Validators.maxLength(255)]],
        address: ['', Validators.maxLength(255)],
        city: ['', Validators.maxLength(255)],
        zipCode: ['', Validators.maxLength(16)],
        phone: ['',[Validators.maxLength(32)]],
        email: ['',[Validators.maxLength(255)]],
        contactPerson: ['',[Validators.maxLength(255)]],
        notes: [''],
        date: ['',[Validators.required,Validators.maxLength(32)]],
        price: ['',[Validators.required, Validators.pattern('[0-9]+')]],
        odo: ['',[Validators.required,Validators.pattern('[0-9]+')]],
        odo2: ['',Validators.pattern('[0-9]+(\.?([0-9])?)?')]
    });

    private _data: Trade;

    constructor(private _form: FormBuilder) { }

    get data() {
        return this._data;
    }

    cancel() {
        this.canceled.emit();
    }

    save() {
        this.updated.emit(this.form.value);
    }
}
