import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Station } from '../station.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnicalInspectionService } from '../technical-inspection.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

@Component({
    selector: 'va-station-form',
    templateUrl: './station-form.component.html',
    styleUrls: ['./station-form.component.scss']
})
export class StationFormComponent {

    @Input() set station(s: Station) {
        if (s) {
            this._station = s;
            this.form.setValue({
                id: s.id,
                name: s.name,
                address: s.address,
                city: s.city,
                zipCode: s.zipCode,
                notes: s.notes,
                phone: s.phone,
                web: s.web
            });
        } else {
            s = null;
            this.form.reset();
        }
    }
    @Output() canceled = new EventEmitter();
    @Output() saved = new EventEmitter();

    form = this._form.group({
        id: [''],
        name: ['', [Validators.required, Validators.maxLength(255)]],
        address: ['', Validators.maxLength(255)],
        city: ['', [Validators.required, Validators.maxLength(255)]],
        zipCode: [''],
        notes: ['', Validators.maxLength(255)],
        phone: [''],
        web: ['']
    });

    private _station: Station;

    constructor(private _form: FormBuilder,
                private _service: TechnicalInspectionService,
                private _toastr: ToastsManager) { }

    get station(): Station {
        return this._station;
    }

    cancel() {
        this.canceled.emit();
        this.station = null;
    }

    save() {
        this._service
            .saveStation(this.form.value)
            .subscribe(this._stationSuccess, this._stationError);
    }

    private _stationSuccess = () => {
        this.form.reset();
        this._toastr.success('Nová stanice byla uložena.','Uloženo');
        this.saved.emit();
    }

    private _stationError = () => {
        this._toastr.error('Stanice nebyla uložena.','Chyba');
    }
}
