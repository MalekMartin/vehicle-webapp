import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { Trade } from '../../../../../shared/api/trade/trade';
import { VehicleInfo } from '../../../../vehicle-stream/vehicle';

@Component({
    selector: 'va-trade-form',
    templateUrl: './trade-form.component.html',
    styleUrls: ['./trade-form.component.scss']
})
export class TradeFormComponent implements OnInit, OnDestroy {
    title: string;

    form = this._fb.group({
        vehicleId: ['', Validators.required],
        company: ['', [Validators.required, Validators.maxLength(255)]],
        address: ['', Validators.maxLength(255)],
        city: ['', Validators.maxLength(255)],
        zipCode: ['', Validators.maxLength(16)],
        phone: ['', [Validators.maxLength(32)]],
        email: ['', [Validators.maxLength(255)]],
        contactPerson: ['', [Validators.maxLength(255)]],
        notes: [''],
        date: ['', [Validators.required, Validators.maxLength(32)]],
        price: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        odo: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        odo2: ['', Validators.pattern('[0-9]+(.?([0-9])?)?')]
    });

    constructor(
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<TradeFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { vehicle: VehicleInfo; type: 'buyer' | 'seller' },
        private _vehicleService: VehicleService,
        private _toastr: ToastrService
    ) {}

    ngOnInit() {
        const data =
            this.data.type === 'buyer' ? this.data.vehicle.buyer : this.data.vehicle.seller;
        this.title = this.data.type === 'buyer' ? 'Kupující' : 'Prodejce';
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
    ngOnDestroy() {}

    cancel() {
        this.dialogRef.close();
    }

    save() {
        this._vehicleService
            .updateTradeInfo(this.data.type, this.form.value)
            .subscribe(this._onSuccess, this._onError);
    }

    private _onSuccess = (t: Trade) => {
        this._toastr.success(this.title + ' úspěšně upraven', 'Uloženo');
        if (this.data.type === 'seller') {
            this._vehicleService.state.update(f => f.replaceSeller, t);
        } else {
            this._vehicleService.state.update(f => f.replaceBuyer, t);
        }
        this.dialogRef.close();
    };

    private _onError = () => {
        this._toastr.error('Data se nepodařilo upravit.');
    };
}
