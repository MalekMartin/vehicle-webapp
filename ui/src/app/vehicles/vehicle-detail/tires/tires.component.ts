import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { TirePropertiesService } from './core/tire-properties.service';
import { TiresService } from './core/tires.service';
import { TireAddComponent } from './tire-add/tire-add.component';
import { TireEditComponent } from './tire-edit/tire-edit.component';
import { TirePreviewComponent } from './tire-preview/tire-preview.component';
import { TirePropertyAddComponent } from './tire-properties/tire-property-add/tire-property-add.component';
import { TirePropertyEditComponent } from './tire-properties/tire-property-edit/tire-property-edit.component';
import { TireStatusFormComponent } from './tire-status-form/tire-status-form.component';
import { Tire, TireProperty, TiresObject, TireStatus } from './tires.interface';

@Component({
    selector: 'va-tires',
    templateUrl: './tires.component.html',
    styleUrls: ['./tires.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fadeId', [
            state('void', style({ opacity: 0 })),
            state('visible', style({ opacity: 1 })),
            transition('void => visible', animate('200ms ease-in'))
        ])
    ]
})
export class TiresComponent implements OnInit, OnDestroy {
    vehicleId: string;
    selectedTire: Tire;
    tireForEdit: Tire;
    tireInChange: { tire: Tire; status: string };
    properties: TireProperty[];

    allTires: TiresObject;

    tireState = merge(
        this._tireService.state.select(s => s.tires, true),
        this._tireService.state.select(s => s.loading, true)
    );
    propertyState = merge(
        this._tiresPropService.state.select(s => s.properties, true),
        this._tiresPropService.state.select(s => s.loading, true)
    );

    private _onDestroy$ = new Subject();

    constructor(
        private _tireService: TiresService,
        private _tiresPropService: TirePropertiesService,
        private _toastr: ToastrService,
        private _vehicleService: VehicleService,
        private _dialog: MatDialog
    ) {}

    ngOnInit() {
        this.vehicleId = this._vehicleService.snapshot.info.id;
        this.getAllTires();
        this.getProperties();
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    getAllTires() {
        this._tireService.state.update(f => f.replaceLoading, true);
        this._tireService
            .getTires(this.vehicleId)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(t => {
                this._tireService.state.update(f => f.replaceTires, t);
                this._tireService.state.update(f => f.replaceLoading, false);
            });
    }

    select(tire: Tire) {
        this.selectedTire = tire;
    }

    addTire() {
        this._dialog.open(TireAddComponent, {
            width: '600px'
        });
    }

    showDetail(tire: Tire) {
        this._dialog.open(TirePreviewComponent, {
            width: '600px',
            data: tire
        });
    }

    updateStatus(data: { tire: Tire; status: TireStatus }) {
        this._tireService.state.update(f => f.updateTire, {
            ...data.tire,
            status: data.status
        });
        this._tireService
            .updateStatus(data)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(
                () => {
                    this._toastr.success('Stav pneumatiky byl úspěšně změněn.', 'Uloženo!');
                },
                () => {
                    this._tireService.state.update(f => f.updateTire, data.tire);
                    this._toastr.success('Nový stav pneumatiky se nepodařilo uložit.', 'Chyba!');
                }
            );
    }

    changeTire(data: { tire: Tire; status: TireStatus }) {
        this._dialog.open(TireStatusFormComponent, {
            width: '400px',
            data: data
        });
    }

    statusSaved(tire: { tire: Tire; date: string }) {
        this._tireService
            .change(tire)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => {
                this._toastr.success('Stav pneumatiky byl úspěšně změněn.', 'Uloženo!');
                this.getAllTires();
            });
    }

    editTire(tire: Tire) {
        this._dialog.open(TireEditComponent, {
            width: '600px',
            data: tire
        });
    }

    deleteTire(tire: Tire) {
        this._tireService.state.update(f => f.deleteTire, tire);
        this._tireService
            .delete(tire)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(
                () => {
                    this._toastr.success('Pneumatika byla úspěšně smazána.', 'Hotovo');
                },
                () => {
                    this._toastr.error('Pneumatika nebyla smazána.', 'Chyba!');
                    this._tireService.state.update(f => f.addTire, tire);
                }
            );
    }

    confirmTireDelete(tire: Tire) {
        this._dialog
            .open(ConfirmComponent, {
                width: '400px',
                data: {
                    title: 'Smazat pneumatiku',
                    message: `Opravdu chceš smazat <b>${tire.brand} ${tire.model}</b>?`,
                    yes: 'Smazat',
                    no: 'Ne'
                }
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(res => {
                if (!!res) {
                    this.deleteTire(tire);
                }
            });
    }

    addProperty() {
        this._dialog
            .open(TirePropertyAddComponent, {
                width: '400px'
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((p: TireProperty | null) => {
                if (!!p) {
                    this._tiresPropService.state.update(f => f.addProperty, p);
                }
            });
    }

    editProperty(p: TireProperty) {
        this._dialog
            .open(TirePropertyEditComponent, {
                width: '400px',
                data: p
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((p: TireProperty | null) => {
                if (!!p) {
                    this._tiresPropService.state.update(f => f.updateProperty, p);
                }
            });
    }

    deleteProperty(p: TireProperty) {
        // optimistic delete
        this._tiresPropService.state.update(f => f.deleteProperty, p);
        this._tiresPropService
            .deleteProperty(p)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(
                () => {
                    this._toastr.success('Parametr byl úspěšně smazán', 'Hotovo!');
                },
                () => {
                    this._toastr.error('Parametr nebyl smazán', 'Chyba!');
                    this._tiresPropService.state.update(f => f.addProperty, p);
                }
            );
    }

    getProperties() {
        this._tiresPropService.state.update(f => f.replaceLoading, true);
        this._tiresPropService
            .getProperties(this.vehicleId)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((p: TireProperty[]) => {
                this._tiresPropService.state.update(f => f.replaceLoading, false);
                this._tiresPropService.state.update(f => f.replaceProperties, p);
            });
    }
}
