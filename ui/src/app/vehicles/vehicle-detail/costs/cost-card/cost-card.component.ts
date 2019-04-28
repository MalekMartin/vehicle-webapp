import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Cost } from '../cost.interface';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { ConfirmDialogService } from '../../../../shared/components/confirm-dialog/confirm-dialog.service';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { CostsService } from '../../../../shared/api/costs/costs.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'va-cost-card',
    templateUrl: './cost-card.component.html',
    styleUrls: ['./cost-card.component.scss']
})
export class CostCardComponent implements OnInit, OnDestroy {
    @Input() cost: Cost;
    @Output() edit = new EventEmitter<Cost>();
    @Output() deleted = new EventEmitter();

    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    constructor(
        private _costs: CostsService,
        private _toastr: ToastsManager,
        private _confirm: ConfirmDialogService,
        private _vehicles: VehicleService
    ) {}

    ngOnInit() {
        this._vehicles.state
            .select(s => s.vehicle, true)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.vehicle.info.units;
                this.units2 = v.vehicle.info.subUnits;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    delete(cost: Cost) {
        this._confirm.dialog
            .title('Odstranit náklady')
            .message('Opravdu chceš vybraný záznam smazat?')
            .ok('smazat')
            .cancel('zpět')
            .subscribe(res => {
                if (res) {
                    this._costs
                        .deleteCost(cost)
                        .subscribe(this._onDeleteSuccess, this._onDeleteError);
                }
            });
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Náklad byl úspěšně smazán', 'Vymazáno!');
        this.deleted.emit();
    };

    private _onDeleteError = () => {
        this._toastr.error('Náklad nebyl smazán', 'Chyba!');
    };
}
