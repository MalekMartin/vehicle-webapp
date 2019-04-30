import { Component, OnChanges, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Tire, TirePropertyExt, TireProperty } from './tires.interface';
import { ModalDirective } from 'ngx-bootstrap';
import { TiresService } from './tires.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { ActivatedRoute } from '@angular/router';
import { TireStatusDialogService } from './tire-status-form/tire-status-form.service';
import { Subscription, Subject } from 'rxjs';
import { TiresObject } from './tires.interface';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import * as _ from 'lodash';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { TirePropertyAddComponent } from './tire-properties/tire-property-add/tire-property-add.component';
import { takeUntil } from 'rxjs/operators';
import { TirePropertyEditComponent } from './tire-properties/tire-property-edit/tire-property-edit.component';

@Component({
    selector: 'va-tires',
    templateUrl: './tires.component.html',
    styleUrls: ['./tires.component.scss'],
    animations: [
        trigger('fadeId', [
            state('void', style({ opacity: 0 })),
            state('visible', style({ opacity: 1 })),
            transition('void => visible', animate('200ms ease-in'))
        ])
    ]
})
export class TiresComponent implements OnChanges, OnInit, OnDestroy {
    vehicleId: string;

    @ViewChild('formModal') public editModal: ModalDirective;
    @ViewChild('previewModal') public detailModal: ModalDirective;
    @ViewChild('statusModal') public statusModal: ModalDirective;

    selectedTire: Tire;
    tireForEdit: Tire;
    tireInChange: { tire: Tire; status: string };
    properties: TirePropertyExt[];

    allTires: TiresObject;

    _tireSubs: Subscription;
    _propSubs: Subscription;

    private _onDestroy$ = new Subject();

    constructor(
        private _tires: TiresService,
        private _toastr: ToastsManager,
        private _route: ActivatedRoute,
        private _statusDialog: TireStatusDialogService,
        private _vehicleService: VehicleService,
        private _dialog: MatDialog,
        private _tire: TiresService
    ) {}

    ngOnInit() {
        this.vehicleId = this._vehicleService.state.snapshot.vehicle.info.id;
        this.getAllTires();
        this.refreshProperties();
    }

    ngOnDestroy() {
        if (!!this._tireSubs) {
            this._tireSubs.unsubscribe();
        }

        if (!!this._propSubs) {
            this._propSubs.unsubscribe();
        }

        this._onDestroy$.next();
    }

    ngOnChanges() {
        this.getAllTires();
    }

    getAllTires() {
        this._tireSubs = this._tires.getByStatuses(this.vehicleId).subscribe((t: TiresObject) => {
            this.allTires = t;
        });
    }

    select(tire: Tire) {
        this.selectedTire = tire;
    }

    formCanceled() {
        this.tireForEdit = null;
        this.editModal.hide();
    }

    formSaved(tire: Tire) {
        this._tires.saveTire(tire).subscribe(() => {
            this._toastr.success('Pneumatika byla úspěšně uložena.', 'Uloženo!');
            this.editModal.hide();
            this.getAllTires();
        });
        this.tireForEdit = null;
    }

    showDetail(tire: Tire) {
        this.selectedTire = tire;
        this.detailModal.show();
    }

    updateStatus(status: any) {
        this._tires.updateStatus(status).subscribe(() => {
            this._toastr.success('Stav pneumatiky byl úspěšně změněn.', 'Uloženo!');
            this.getAllTires();
        });
    }

    changeTire(model: any) {
        this._statusDialog.dialog.tire(model).subscribe(res => {
            if (res.result) {
                this.statusSaved(res.tire);
            }
        });
    }

    statusSaved(tire: { tire: Tire; date: string }) {
        this._tires.change(tire).subscribe(() => {
            this._toastr.success('Stav pneumatiky byl úspěšně změněn.', 'Uloženo!');
            this.getAllTires();
        });
    }

    tireEdited(tire: Tire) {
        this.tireForEdit = tire;
        this.editModal.show();
    }

    tireDeleted(tire: Tire) {
        this._tires.delete(tire).subscribe(() => {
            this._toastr.success('Pneumatika byla úspěšně smazána.', 'Smazáno!');
            this.getAllTires();
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
                    this.properties = [...this.properties, { ...p, status: 'active' }];
                }
            });
    }

    editProperty(p: TirePropertyExt) {
        this._dialog
            .open(TirePropertyEditComponent, {
                width: '400px',
                data: p
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((p: TirePropertyExt | null) => {
                if (!!p) {
                    this.properties = this.properties.map(i => {
                        return p.id === i.id ? p : i;
                    });
                }
            });
    }

    deleteProperty(p: TirePropertyExt) {
        // optimistic delete
        const i = this.properties.findIndex(item => item.id === p.id);
        this.properties.splice(i, 1);
        this._tire
            .deleteProperty(p)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(
                () => {
                    this._toastr.success('Parametr byl úspěšně smazán', 'Hotovo!');
                },
                () => {
                    this._toastr.error('Parametr nebyl smazán', 'Chyba!');
                    this.properties = [...this.properties, p];
                }
            );
    }

    refreshProperties() {
        this._propSubs = this._tire.getProperties(this.vehicleId).subscribe((p: TireProperty[]) => {
            this.properties = p.map(prop => {
                return { ...prop, status: 'active' };
            });
        });
    }
}
