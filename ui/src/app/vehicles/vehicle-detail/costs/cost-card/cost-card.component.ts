import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cost } from '../cost.interface';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { ConfirmDialogService } from '../../../../shared/components/confirm-dialog/confirm-dialog.service';
import { VehicleService } from '../../../vehicle-stream/vehicle.service';
import { CostsService } from '../../../../shared/api/costs/costs.service';

@Component({
    selector: 'va-cost-card',
    templateUrl: './cost-card.component.html',
    styleUrls: ['./cost-card.component.scss']
})

export class CostCardComponent implements OnInit {

    @Input() cost: Cost;
    @Output() deleted = new EventEmitter();

    constructor(private _costs: CostsService,
                private _toastr: ToastsManager,
                private _confirm: ConfirmDialogService,
                private _vehicles: VehicleService) { }

    ngOnInit() { }

    get units(): string {
        return this._vehicles.units;
    }

    get units2(): string {
        return this._vehicles.Units2;
    }

    delete(cost: Cost) {
        this._confirm.dialog
            .title('Odstranit náklady')
            .message('Opravdu chceš vybraný záznam smazat?')
            .ok('smazat')
            .cancel('zpět')
            .subscribe(res => {
                if (res) {
                    this._costs.deleteCost(cost)
                    .subscribe(this._onDeleteSuccess, this._onDeleteError);
                }
            });
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Náklad byl úspěšně smazán','Vymazáno!');
        this.deleted.emit();
    }

    private _onDeleteError = () => {
        this._toastr.error('Náklad nebyl smazán','Chyba!');
    }
}
