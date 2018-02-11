import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'va-info-form',
    templateUrl: './info-form.component.html',
    styleUrls: ['./info-form.component.scss']
})
export class InfoFormComponent {

    @Input() set info(v: Vehicle) {
        if (v) {
            this.form.setValue({
                id: v.id,
                brand: v.brand,
                model: v.model,
                manufactureYear: v.manufactureYear,
                spz: v.spz,
                previousOwners: v.previousOwners,
                type: v.type,
                notes: v.notes
            });
            this._vehicle = v;
        }
    }

    @Output() infoUpdated = new EventEmitter();

    @Output() infoCanceled = new EventEmitter();

    form = this._form.group({
        id: ['',Validators.required],
        brand: ['', [Validators.required, Validators.maxLength(128)]],
        model: ['', [Validators.required, Validators.maxLength(128)]],
        manufactureYear: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
        spz: ['',[Validators.maxLength(16)]],
        previousOwners: ['',[Validators.pattern('[0-9]*')]],
        type: ['',[Validators.required]],
        notes: ['']
    });

    private _vehicle: Vehicle;

    constructor(private _form: FormBuilder) { }

    // ngOnChanges() {
    //     this.form.setValue({
    //         id: this.info.id,
    //         vehicleId: this.info.vehicleId,
    //         brand: this.info.brand,
    //         model: this.info.model,
    //         manufactureYear: this.info.manufactureYear,
    //         spz: this.info.spz,
    //         previousOwners: this.info.previousOwners,
    //         type: this.info.type,
    //         notes: this.info.notes
    //     });
    // }

    get vehicle(): Vehicle {
        return this._vehicle;
    }

    save() {
        this.infoUpdated.emit(this.form.value);
        this._vehicle = this.form.value;
    }

    cancel() {
        this.form.reset(this.vehicle);
        this.infoCanceled.emit();
    }
}

interface Vehicle {
    id: string;
    brand: string;
    model: string;
    manufactureYear: number;
    spz: string;
    previousOwners: number;
    type: 'CAR' | 'MOTORCYCLE';
    notes: string;
}
