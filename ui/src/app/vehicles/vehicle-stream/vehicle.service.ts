import { Injectable } from '@angular/core';
import { Vehicle, VehicleInfo, Info } from './vehicle';
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class VehicleService {

    vehicleSubject = new ReplaySubject<Info>(1);

    private _vehicles: Vehicle[];
    private _vehicle: VehicleInfo;
    private _vehicleId: string;

    constructor(private _http:HttpService,
                private _toastr:ToastsManager) {
    }

    get allVehicles(): Vehicle[]{
        return this._vehicles;
    }

    set activeVehicle(vehicle: VehicleInfo) {
        this._vehicle = vehicle;
    }

    get vehicleId(): string {
        return this._vehicleId;
    }

    set vehicleId(id: string) {
        this._vehicleId = id;
    }

    get activeVehicle(): VehicleInfo {
        return this._vehicle;
    }

    get units(): string {
        return !!this._vehicle ? this._vehicle.info.units : null;
    }

    get Units2(): string {
        return !!this._vehicle ? this._vehicle.info.subUnits : null;
    }

    get vehicle() {
        return !!this._vehicle ? this._vehicle : null;
    }

    get tankCapacity(): number | null {
        return !!this._vehicle ? this._vehicle.info.tankCapacity : null;
    }

    addVehicle(vehicle:Vehicle) {
        return this._http
            .post('/resource/vehicle/new', vehicle);
    }

    getInfo(id:string): Observable<VehicleInfo> {
        this.activeVehicle = null;
        return this._http
            .get<VehicleInfo>('/resource/info/' + id)
            .do((vehicle: VehicleInfo) => {
                this.activeVehicle = vehicle;
                this.vehicleSubject.next(vehicle.info);
            });
    }

    deleteVehicle(vehicleId:string) {
        return this._http
            .delete('/resource/vehicle/' + vehicleId);
    }

    refresh() {
        this._http.get('/resource/vehicles')
            .subscribe((vehicles: Vehicle[]) => {
                this._vehicles = vehicles;
            });
    }

    getLastEvents() {
        return this._http
            .get('/resource/vehicle/last-events');
    }

    getVehicleDetail(vehicleId: string) {
        return this._http
            .get('/resource/vehicle/' + vehicleId);
    }
}
