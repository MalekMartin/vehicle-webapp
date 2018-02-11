import {
    Component,
    Input,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes,
    AUTO_STYLE
} from '@angular/core';
import { TechnicalInspectionService } from './technical-inspection.service';
import { Station } from './station';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Inspection } from './inspection';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../../utils/pageable';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { VehicleService } from '../../vehicle-stream/vehicle.service';

@Component({
    selector: 'va-technical-inspection',
    templateUrl: './technical-inspection.component.html',
    styleUrls: ['./technical-inspection.component.scss'],
    animations: [
        trigger('openClose', [
            state('collapsed, void', style({ overflow: 'hidden', height: '0px' })),
            state('expanded', style({ overflow: 'visible', height: AUTO_STYLE })),
            transition('collapsed => expanded', [
                animate(400, keyframes([
                    style({ overflow: 'hidden', height: '0px', offset: 0 }),
                    style({ overflow: 'hidden', height: AUTO_STYLE, offset: 0.9 }),
                    style({ overflow: 'visible', offset: 1 })
                ]))
            ]),
            transition('expanded => collapsed', [
                animate(400, keyframes([
                    style({ overflow: 'visible', offset: 0 }),
                    style({ overflow: 'hidden', height: AUTO_STYLE, offset: 0.1 }),
                    style({ overflow: 'hidden', height: '0px', offset: 1 }),
                ]))
            ])
        ])
    ]
})
export class TechnicalInspectionComponent implements OnInit, OnDestroy {

    vehicleId:string;

    inspectionFormExpanded = false;

    stationFormExpanded = false;

    stations:Station[];

    inspections:Inspection[];

    selectedInspection:Inspection = null;

    selectedStation:Station = null;
    stationLoading = false;

    private _currentSubs: Subscription;
    private _pageSubs: Subscription;
    private _stationsSubs: Subscription;

    constructor(private _service:TechnicalInspectionService,
                private _toastr:ToastsManager,
                private _route:ActivatedRoute,
                private _vehicleService: VehicleService) { }

    ngOnInit() {

        this.getStations();
        this.vehicleId = this._vehicleService.vehicleId;
        this._service.vehicleId = this.vehicleId;
        this.fetchCurrentPage();
    }

    ngOnDestroy() {
        if (this._currentSubs) {
            this._currentSubs.unsubscribe();
        }
        if (this._pageSubs) {
            this._pageSubs.unsubscribe();
        }
        if (this._stationsSubs) {
            this._stationsSubs.unsubscribe();
        }
    }

    get inspectionService(): TechnicalInspectionService {
        return this._service;
    }

    get isLoading(): boolean {
        return this._service.loading;
    }

    fetchCurrentPage() {
        this._currentSubs = this._service
            .fetchCurrentPage()
            .subscribe(this._handleNewContent);
    }

    fetchPage(p: number) {
        this._pageSubs = this._service
            .fetchPage(p)
            .subscribe(this._handleNewContent);
    }

    getStations() {
        this.stationLoading = true;
        this._stationsSubs = this._service
            .getStations()
            .subscribe((s:Station[]) => {
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

    editStation(s:Station) {
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

    inspectionEdit(i:Inspection) {
        this.selectedInspection = i;
        this.inspectionFormExpanded = true;
    }

    cancelInspection() {
        this.selectedInspection = null;
        this.inspectionFormExpanded = false;
    }

    private _handleNewContent = (i:Page<Inspection>) => {
        this.inspections = i.content;
    }
}
