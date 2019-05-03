import {
    animate,
    AUTO_STYLE,
    keyframes,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { Page } from '../../../utils/pageable';
import { Inspection } from './inspection.interface';
import { InspectionAddComponent } from './inspection-add/inspection-add.component';
import { InspectionEditComponent } from './inspection-edit/inspection-edit.component';
import { Station } from './station.interface';
import { TechnicalInspectionService } from './technical-inspection.service';

@Component({
    selector: 'va-technical-inspection',
    templateUrl: './technical-inspection.component.html',
    styleUrls: ['./technical-inspection.component.scss'],
    animations: [
        trigger('openClose', [
            state('collapsed, void', style({ overflow: 'hidden', height: '0px' })),
            state('expanded', style({ overflow: 'visible', height: AUTO_STYLE })),
            transition('collapsed => expanded', [
                animate(
                    400,
                    keyframes([
                        style({ overflow: 'hidden', height: '0px', offset: 0 }),
                        style({ overflow: 'hidden', height: AUTO_STYLE, offset: 0.9 }),
                        style({ overflow: 'visible', offset: 1 })
                    ])
                )
            ]),
            transition('expanded => collapsed', [
                animate(
                    400,
                    keyframes([
                        style({ overflow: 'visible', offset: 0 }),
                        style({ overflow: 'hidden', height: AUTO_STYLE, offset: 0.1 }),
                        style({ overflow: 'hidden', height: '0px', offset: 1 })
                    ])
                )
            ])
        ])
    ]
})
export class TechnicalInspectionComponent implements OnInit, OnDestroy {
    vehicleId: string;
    stationFormExpanded = false;
    stations: Station[];
    inspections: Inspection[];
    selectedStation: Station = null;
    stationLoading = false;
    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    constructor(
        private _service: TechnicalInspectionService,
        private _toastr: ToastsManager,
        private _vehicleService: VehicleService,
        private _dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getStations();
        this.vehicleId = this._vehicleService.state.snapshot.vehicle.info.id;
        this._service.vehicleId = this.vehicleId;
        this.fetchCurrentPage();
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get inspectionService(): TechnicalInspectionService {
        return this._service;
    }

    get isLoading(): boolean {
        return this._service.loading;
    }

    fetchCurrentPage() {
        this._service
            .fetchCurrentPage()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._handleNewContent, this._handleContentError);
    }

    fetchPage(p: number) {
        this._service
            .fetchPage(p)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._handleNewContent, this._handleContentError);
    }

    getStations() {
        this.stationLoading = true;
        this._service
            .getStations()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onStationsSuccess, this._onStationsError);
    }

    openAddForm(e: MouseEvent) {
        e.preventDefault();
        this._dialog
            .open(InspectionAddComponent, {
                width: '400px'
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(d => {
                if (!!d) {
                    this.fetchCurrentPage();
                }
            });
    }

    saveStation() {
        this.getStations();
        this.toggleStationState();
    }

    cancelStationForm() {
        this.toggleStationState();
    }

    toggleStationState() {
        this.stationFormExpanded = !this.stationFormExpanded;
    }

    addStk() {
        this.stationFormExpanded = true;
        this.selectedStation = null;
    }

    editStation(s: Station) {
        this.selectedStation = s;
        this.stationFormExpanded = true;
    }

    onStationDelete() {
        this.getStations();
    }

    inspectionEdit(i: Inspection) {
        this._dialog
            .open(InspectionEditComponent, {
                width: '400px',
                data: i
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(d => {
                if (!!d) {
                    this.fetchCurrentPage();
                }
            });
    }

    confirmDelete(i: Inspection) {
        this._dialog
            .open(ConfirmComponent, {
                width: '400px',
                data: {
                    title: 'Smazat TK',
                    message: 'Opravdu chceš smazat tuto TK?',
                    yes: 'Ano, smazat',
                    no: 'Ne'
                }
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(res => {
                if (!!res) {
                    this.delete(i);
                }
            });
    }

    delete(i: Inspection) {
        this.inspections = this.inspections.filter(v => v.id !== i.id);
        return this._service
            .deleteInspection(i)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(
                () => {
                    this._toastr.success('Technická kontrolo byla odstraněna.', 'Smazáno');
                },
                () => {
                    this._toastr.error('Chyba při mazání technické kontroly', 'Chyba');
                    this.inspections = [...this.inspections, i];
                }
            );
    }

    private _handleNewContent = (i: Page<Inspection>) => {
        this.inspections = i.content;
    };

    private _handleContentError = () => {
        this._toastr.error('Nepodařilo se nahrát data', 'Chyba');
    };

    private _onStationsSuccess = (s: Station[]) => {
        this.stations = s;
        this.stationLoading = false;
    };

    private _onStationsError = () => {
        this.stationLoading = false;
        this._toastr.error('Nepodařilo se nahrát technické stanice', 'Chyba');
    };
}
