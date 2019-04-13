import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { HttpService } from '../../../core/http.service';
import { DatepickerModule } from 'ngx-bootstrap';
import * as moment from 'moment';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

@Component({
    selector: 'va-vehicle-add',
    templateUrl: './vehicle-add.component.html',
    styleUrls: ['./vehicle-add.component.scss']
})
export class VehicleAddComponent implements OnInit {

    @Output() saved = new EventEmitter();
    @Output() canceled = new EventEmitter();

    form = this._form.group({
            brand: ['', [Validators.required]],
            model: ['', [Validators.required]],
            manufactureYear: ['', [Validators.required]],
            spz: [''],
            previousOwners: [0, Validators.pattern('[0-9]+')],
            type: ['', Validators.required],
            notes: [''],
        });

    constructor(private _service: VehicleService,
                private _form: FormBuilder,
                private _http: HttpService,
                private _toastr: ToastsManager) { }

    ngOnInit() { }

    save() {
        this._service
            .addVehicle(this.form.value)
            .subscribe(this._onSuccess, this._onError);
    }

    cancel() {
        this.form.reset();
        this.canceled.emit();
    }

    private _onSuccess = (id: string) => {
        this._toastr.success('Vozidlo ' + this.form.value.brand + ' '
                    + this.form.value.model + ' vloženo', 'Vloženo!');
        this.form.reset();
        this.saved.emit(id);
    }

    private _onError = () => {
        this._toastr.error('Vozidlo nebylo vloženo', 'Chyba!');
    }
}
