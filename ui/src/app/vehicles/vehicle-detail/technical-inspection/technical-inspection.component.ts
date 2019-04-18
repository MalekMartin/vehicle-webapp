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
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { Page } from '../../../utils/pageable';
import { Inspection } from './inspection';
import { Station } from './station';
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
    inspectionFormExpanded = false;
    stationFormExpanded = false;
    stations: Station[];
    inspections: Inspection[];
    selectedInspection: Inspection = null;
    selectedStation: Station = null;
    stationLoading = false;
    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    constructor(
        private _service: TechnicalInspectionService,
        private _toastr: ToastsManager,
        private _route: ActivatedRoute,
        private _vehicleService: VehicleService
    ) {}

    ngOnInit() {
        this.getStations();
        this.vehicleId = this._vehicleService.vehicleId;
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
            .subscribe(this._handleNewContent);
    }

    fetchPage(p: number) {
        this._service
            .fetchPage(p)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._handleNewContent);
    }

    getStations() {
        this.stationLoading = true;
        this._service
            .getStations()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((s: Station[]) => {
                this.stations = s;
                this.stationLoading = false;
            });
    }

    addTk() {
        this.selectedInspection = null;
        this.inspectionFormExpanded = true;
    }

    saveStation() {
        this.getStations();
        this.toggleStationState();
    }

    cancelStationForm() {
        this.toggleStationState();
    }

    toggleInspectionState() {
        this.inspectionFormExpanded = !this.inspectionFormExpanded;
    }

    toggleStationState() {
        this.stationFormExpanded = !this.stationFormExpanded;
    }

    onInspectionDelete() {
        this.fetchCurrentPage();
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

    onSave() {
        this.inspectionFormExpanded = false;
        this.fetchCurrentPage();
    }

    inspectionEdit(i: Inspection) {
        this.selectedInspection = i;
        this.inspectionFormExpanded = true;
    }

    cancelInspection() {
        this.selectedInspection = null;
        this.inspectionFormExpanded = false;
    }

    private _handleNewContent = (i: Page<Inspection>) => {
        this.inspections = i.content;
    };
}
