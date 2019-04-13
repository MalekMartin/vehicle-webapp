import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RepairService } from '../repair.service';
import {
    ConfirmDialogService
} from '../../../../shared/components/confirm-dialog/confirm-dialog.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { RepairTask } from '../_core/repair-task.interface';
import { Repair } from '../_core/repair.interface';
import { RepairFormService } from '../repair-form/repair-form.service';
import { VehicleService } from '../../../vehicle-stream/vehicle.service';

@Component({
    selector: 'va-repair-card',
    templateUrl: './repair-card.component.html',
    styleUrls: ['./repair-card.component.scss']
})

export class RepairCardComponent {

    @Input() repair: Repair;
    @Output() onDelete = new EventEmitter();
    @Output() onUpdate = new EventEmitter();

    constructor(private _confirm: ConfirmDialogService,
                private _repairs: RepairService,
                private _toastr: ToastsManager,
                private _repairForm: RepairFormService,
                private _vehicles: VehicleService) { }

    get units(): string {
        return this._vehicles.units;
    }

    get subUnits(): string {
        return this._vehicles.Units2;
    }

    deleteConfirm() {
        this._confirm
            .dialog
            .title('Opravdu chceš smazat servisní práci?')
            .message('Servisní práce <i>' + this.repair.title + '</i> bude smazána i se souvisejícími údržbamy.')
            .ok('Smazat')
            .cancel('zpět')
            .subscribe((res) => {
                if (res) {
                    this.onDelete.emit(this.repair);
                }
            });
    }

    edit(event: MouseEvent) {
        this._repairForm.dialog
            .repair(this.repair)
            .title('Editace opravy')
            .subscribe((res) => {
                if (res) {
                    this.onUpdate.emit();
                }
            });
        event.preventDefault();
    }

}
