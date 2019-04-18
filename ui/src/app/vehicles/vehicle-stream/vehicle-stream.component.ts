import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Vehicle } from './vehicle';
import { VehicleService } from '../../core/stores/vehicle/vehicle.service';
import {
    ConfirmDialogService
} from '../../shared/components/confirm-dialog/confirm-dialog.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'va-vehicle-stream',
    templateUrl: './vehicle-stream.component.html',
    styleUrls: ['./vehicle-stream.component.scss']
})
export class VehicleStreamComponent implements OnInit, OnDestroy {

    filter: string;
    expanded = false;
    _events: any;

    query = new FormControl('');

    @ViewChild('modal') modal: ModalDirective;

    private _onDestroy$ = new Subject();

    constructor(private _service: VehicleService,
                private _confirm: ConfirmDialogService,
                private _toastr: ToastsManager,
                private _router: Router) { }

    ngOnInit() {
        this._service.activeVehicle = null;

        this.query.valueChanges
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(res => {
                this.filter = res;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get vehicles(): Vehicle[] {
        return this._service.allVehicles;
    }

    get events(): any {
        return this._events;
    }

    addVehicle(e: MouseEvent) {
        this.modal.show();
        e.preventDefault();
    }

    closeModal() {
        this.modal.hide();
    }

    onSave(vehicleId: string) {
        this._router.navigate(['vehicle', vehicleId, 'settings']);
        this._service.refresh();
    }

    onDelete(vehicle: Vehicle) {
        this._confirm.dialog
            .title('Smazat vozidlo')
            .message('Opravdu si přeješ smazat vozidlo ' + vehicle.brand + ' ' + vehicle.model + '?')
            .ok('Ano, smazat')
            .cancel('Ne')
            .subscribe(res => {
                if (res) {
                    this.delete(vehicle);
                }
            });
    }

    delete(vehicle) {
        this._service.deleteVehicle(vehicle.id)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    private _onDeleteSuccess = () => {
        this._service.refresh();
    }

    private _onDeleteError = () => {
        this._toastr.error('Nepodařilo se smazat vybrané vozidlo');
    }
}
