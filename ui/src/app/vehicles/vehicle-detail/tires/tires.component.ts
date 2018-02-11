import { Component, OnChanges, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Tire, PropertyExt } from './tires.interface';
import { ModalDirective } from 'ngx-bootstrap';
import { TiresService } from './tires.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute } from '@angular/router';
import { TireStatusDialogService } from './tire-status-form/tire-status-form.service';
import { Subscription } from 'rxjs/Subscription';
import { TiresObject } from './tires.interface';
import { VehicleService } from '../../vehicle-stream/vehicle.service';
import { TirePropertiesFormService } from './tire-properties-form/tire-properties-form.service';
import { Property } from './_core/property';
import * as _ from 'lodash';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'va-tires',
    templateUrl: './tires.component.html',
    styleUrls: ['./tires.component.scss'],
    animations: [
        trigger('fadeId', [
            state('void', style({opacity: 0})),
            state('visible', style({opacity: 1})),
            transition('void => visible', animate('200ms ease-in')),
        ])
    ]
})
export class TiresComponent implements OnChanges, OnInit, OnDestroy {

    vehicleId:string;

    @ViewChild('formModal') public editModal: ModalDirective;
    @ViewChild('previewModal') public detailModal: ModalDirective;
    @ViewChild('statusModal') public statusModal: ModalDirective;

    selectedTire: Tire;
    tireForEdit: Tire;
    tireInChange:{tire: Tire, status: string};
    properties: PropertyExt[];

    allTires: TiresObject;

    _tireSubs: Subscription;
    _propSubs: Subscription;

    constructor(private _tires:TiresService,
                private _toastr:ToastsManager,
                private _route:ActivatedRoute,
                private _statusDialog: TireStatusDialogService,
                private _vehicleService: VehicleService,
                private _dialog: TirePropertiesFormService,
                private _tire: TiresService) { }

    ngOnInit() {
        this.vehicleId = this._vehicleService.vehicleId;
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
    }

    ngOnChanges() {
        this.getAllTires();
    }

    getAllTires() {
        this._tireSubs = this._tires.getByStatuses(this.vehicleId)
            .subscribe((t: TiresObject) => {
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
        this._tires.saveTire(tire)
            .subscribe(() => {
                this._toastr.success('Pneumatika byla úspěšně uložena.','Uloženo!');
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
        this._tires.updateStatus(status)
            .subscribe(() => {
                this._toastr.success('Stav pneumatiky byl úspěšně změněn.','Uloženo!');
                this.getAllTires();
            });
    }

    changeTire(model:any) {
        this._statusDialog.dialog
            .tire(model)
            .subscribe((res) => {
                if (res.result) {
                    this.statusSaved(res.tire);
                }
            });
    }

    statusSaved(tire: {tire: Tire, date: string}) {
        this._tires.change(tire)
            .subscribe(() => {
                this._toastr.success('Stav pneumatiky byl úspěšně změněn.','Uloženo!');
                this.getAllTires();
            });
    }

    tireEdited(tire: Tire) {
        this.tireForEdit = tire;
        this.editModal.show();
    }

    tireDeleted(tire: Tire) {
        this._tires.delete(tire)
            .subscribe(() => {
                this._toastr.success('Pneumatika byla úspěšně smazána.','Smazáno!');
                this.getAllTires();
            });
    }

    addProperty() {
        this._dialog.dialog
            .property(this._buildEmptyProp)
            .title('Nový parametr')
            .subscribe(res => {
                if (res.result) {
                    this._tire.updateProperty(res.form)
                        .subscribe(this._onAddSuccess, this._onAddError);
                }
            });
    }

    refreshProperties() {
        this._propSubs = this._tire.getProperties(this.vehicleId)
            .subscribe((p: Property[]) => {
                this.properties = p.map(prop => {
                    return {...prop, status: 'active'};
                });
            });
    }

    private _onAddSuccess = (p: Property) => {
        this._toastr.success('Nový parametr byl úspěšně vložen.');
        // this.refreshProperties();
        const newProperty = {...p, status: 'hidden'};
        const properties = _.clone(this.properties);
        properties.push(newProperty);

        this.properties = properties;
    }

    private _onAddError = () => {
        this._toastr.error('Parametr nebyl uložen.');
    }

    private get _buildEmptyProp(): Property {
        return {
            id: '',
            vehicleId: this.vehicleId,
            name: '',
            value: '',
            tooltip: ''
        };
    }
}
