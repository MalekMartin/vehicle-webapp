import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { GarageService } from '../../../../../car-services/garage/garage.service';
import { Maintenance } from '../../../../../shared/api/maintenance/maintenance.interface';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { VValidators } from '../../../../../shared/forms/validators';
import { RepairService } from '../../../repair/repair.service';

@Component({
    selector: 'va-maintenance-done',
    templateUrl: './maintenance-done.component.html',
    styleUrls: ['./maintenance-done.component.scss']
})
export class MaintenanceDoneComponent {

    @Input() set maintenance(m:Maintenance[]) {
        if (m) {
            const filtered = m.filter(maintenance => maintenance.status === 'IN_PROGRESS');
            const ids = filtered.map(maintenance => maintenance.id);

            this._inconsistance = ids.length !== m.length && ids.length > 0;
            this._error = ids.length === 0;
            // this._id = m.id;
            // this.form.patchValue({
            //     id: m.id,
            //     intervalName: m.interval.name
            // });
            this.form.patchValue({
                ids: ids
            });
        }
        this._garages.refresh();
    }

    @Input() set vehicleId(id: string) {
        if (id) {
            this.form.patchValue({vehicleId: id});
            this._vehicleId = id;
        }
    }

    @Output() canceled = new EventEmitter();

    @Output() saved = new EventEmitter();

    form = this._form.group({
        ids: [[], Validators.required],
        vehicleId: [''],
        odo: [0, VValidators.validateNumber],
        odo2: [0, VValidators.validateNumber],
        date: ['', Validators.required],
        price: [0, VValidators.validateNumber],
        notes: [''],
        repeat: [true],
        garageId: ['', Validators.required],
        repairTitle: ['', Validators.required]
    });

    private _id: string;
    private _vehicleId: string;
    private _inconsistance = false;
    private _error = false;

    constructor(private _form:FormBuilder,
                private _service:MaintenanceService,
                private _toastr: ToastsManager,
                private _garages: GarageService,
                private _repairs: RepairService) { }

    get id(): string {
        return this._id;
    }

    get garages() {
        return this._garages.garages;
    }

    get vehicleId(): string {
        return this._vehicleId;
    }

    get hasIds(): boolean {
        return this.form.get('ids').value && this.form.get('ids').value.length > 0;
    }

    get showWarning(): boolean {
        return this._inconsistance;
    }

    get hasError(): boolean {
        return this._error;
    }

    resetForm() {
        this.form.reset({
            repeat: true
        });
    }

    cancel() {
        this.resetForm();
        this.canceled.emit();
    }

    save() {
        this._service
            .finishMaintenance(this.form.value)
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

    private _onSaveSuccess = (repair) => {
        this.saved.emit(repair);
        this.resetForm();
        this._toastr.success('Dokončeno!');
    }

    private _onSaveError = () => {
        this._toastr.error('Chyba!');
    }
}
