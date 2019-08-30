import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'va-tire-property-form',
    templateUrl: './tire-property-form.component.html',
    styleUrls: ['./tire-property-form.component.scss']
})
export class TirePropertyFormComponent {
    form = this._fb.group({
        id: [''],
        vehicleId: ['', Validators.required],
        name: ['', Validators.required],
        value: ['', Validators.required],
        tooltip: ['']
    });

    constructor(private _fb: FormBuilder) {}
}
