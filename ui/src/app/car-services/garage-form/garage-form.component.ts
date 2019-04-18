import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { GarageService } from '../garage/garage.service';

@Component({
    selector: 'va-garage-form',
    templateUrl: './garage-form.component.html',
    styleUrls: ['./garage-form.component.scss']
})

export class GarageFormComponent implements OnInit {

    @Input() set garage(g:Garage) {
        if (g) {
            this._garage = g;
            this.form.setValue({
                id: g.id,
                name: g.name,
                address: g.address,
                city: g.city,
                zipCode: g.zipCode,
                web: g.web,
                phone: g.phone,
                notes: g.notes
            });
        }
    }

    @Output() saved = new EventEmitter();
    @Output() canceled = new EventEmitter();

    form = this._form.group({
        id: [''],
        name: ['', Validators.required],
        address: [''],
        city: [''],
        zipCode: [''],
        web: [''],
        phone: [''],
        notes: ['']
    });

    private _garage: Garage;

    constructor(private _form: FormBuilder,
                private _garages: GarageService,
                private _toastr: ToastsManager) { }

    ngOnInit() { }

    get garage(): Garage {
        return this._garage;
    }

    save() {
        this.saved.emit(this.form.value);
        this.form.reset();    }

    cancel() {
        this.form.reset();
        this.canceled.emit();
    }
}

export interface Garage {
    id?: string;
    name: string;
    address: string;
    city: string;
    zipCode: string;
    web: string;
    phone: string;
    notes: string;
}
