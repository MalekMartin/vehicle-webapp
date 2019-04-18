import { Component, OnInit } from '@angular/core';
import { GarageService } from './garage.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { Garage } from '../garage-form/garage-form.component';

@Component({
    selector: 'va-garage',
    templateUrl: './garage.component.html',
    styleUrls: ['./garage.component.scss']
})

export class GarageComponent implements OnInit {

    selected: Garage = null;

    constructor(private _garages: GarageService,
                private _toastr: ToastsManager) { }

    ngOnInit() {
        this._garages.refresh();
    }

    get garages(): Garage[] {
        return this._garages.garages;
    }

    onSave(g: Garage) {
        if (!!g.id) {
            this._garages
                .updateGarage(g)
                .subscribe(this._handleSaveSuccess, this._handleSaveError);
        } else {
            this._garages
                .addGarage(g)
                .subscribe(this._handleSaveSuccess, this._handleSaveError);
        }
    }

    onCancel() {
        this.selected = null;
    }

    edit(garage: Garage) {
        this.selected = garage;
    }

    delete(garage: Garage) {
        this._garages.delete(garage)
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    private _handleSaveSuccess = () => {
        this._toastr.success('Servis úspěšně uložen', 'Uloženo!');
        this._garages.refresh();
    }

    private _handleSaveError = () => {
        this._toastr.error('Chyba ukládání', 'Chyba!');
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Servis byl úspěšně odstraněn.');
        this._garages.refresh();
    }

    private _onDeleteError = () => {
        this._toastr.error('Servis nebyl odstraněn.');
    }
}
