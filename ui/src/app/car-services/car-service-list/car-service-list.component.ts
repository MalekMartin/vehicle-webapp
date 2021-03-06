import { Component, OnInit, ViewChild } from '@angular/core';
import { CarServiceService, Service } from '../vehicle-repairs.service';
import { GarageService } from '../garage/garage.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Garage } from '../garage-form/garage-form.component';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

@Component({
    selector: 'va-car-service-list',
    templateUrl: './car-service-list.component.html',
    styleUrls: ['./car-service-list.component.scss']
})

export class CarServiceListComponent implements OnInit {

    services: Service[];

    @ViewChild('modal') modal: ModalDirective;

    constructor(private _services: CarServiceService,
                private _garages: GarageService,
                private _toastr: ToastsManager) { }

    ngOnInit() {
        this._garages.refresh();
    }

    get garages() {
        return this._garages.garages;
    }

    add(e: MouseEvent) {
        this.modal.show();
        e.preventDefault();
    }

    onSave(g: Garage) {
        this._garages
            .updateGarage(g)
            .subscribe(this._handleSaveSuccess, this._handleSaveError);
    }

    onCancel() {
        this.modal.hide();
    }

    delete(garage: Garage) {
        this._garages.delete(garage)
            .subscribe(this._onDeleted, this._onDeleteError);
    }

    private _onDeleted = () => {
        this._garages.refresh();
    }

    private _onDeleteError = () => {
        this._toastr.error('Servis se nepdařilo smazat!');
    }

    private _handleSaveSuccess = () => {
        this._toastr.success('Servis úspěšně uložen', 'Uloženo!');
        this._garages.refresh();
        this.onCancel();
    }

    private _handleSaveError = () => {
        this._toastr.error('Chyba ukládání', 'Chyba!');
    }

}
