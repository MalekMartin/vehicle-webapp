import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Subjective } from 'subjective';
import { Engine, Vehicle, VehicleInfo } from '../../../vehicles/vehicle-stream/vehicle';
import { HttpService } from '../../http.service';
import { VehicleInfoFormModel } from './vehicle.interface';
import { VehicleState, vehicleStateFns } from './vehicle.state';
import { Trade } from '../../../shared/api/trade/trade';

@Injectable()
export class VehicleService {
    // vehicle = new Subjective()
    vehicleSubject = new ReplaySubject<VehicleInfo>(1);

    state = new Subjective(new VehicleState(), vehicleStateFns);

    private _vehicles: Vehicle[];
    private _vehicle: VehicleInfo;
    private _vehicleId: string;

    constructor(private _http: HttpService) {}

    get allVehicles(): Vehicle[] {
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

    get units2(): string {
        return !!this._vehicle ? this._vehicle.info.subUnits : null;
    }

    get vehicle() {
        return !!this._vehicle ? this._vehicle : null;
    }

    get tankCapacity(): number | null {
        return !!this._vehicle ? this._vehicle.info.tankCapacity : null;
    }

    addVehicle(vehicle: Vehicle) {
        return this._http.post('/resource/vehicle/new', vehicle);
    }

    getInfo(id: string): Observable<VehicleInfo> {
        this.activeVehicle = null;
        this.state.update(f => f.replaceLoading, true);
        return this._http.get<VehicleInfo>('/resource/info/' + id).pipe(
            tap((vehicle: VehicleInfo) => {
                this.activeVehicle = vehicle;
                this.vehicleSubject.next(vehicle);
                this.state.update(f => f.replaceLoading, false);
            })
        );
    }

    deleteVehicle(vehicleId: string) {
        return this._http.delete('/resource/vehicle/' + vehicleId);
    }

    refresh() {
        this._http.get('/resource/vehicles').subscribe((vehicles: Vehicle[]) => {
            this._vehicles = vehicles;
        });
    }

    getLastEvents() {
        return this._http.get('/resource/vehicle/last-events');
    }

    getVehicleDetail(vehicleId: string): Observable<VehicleInfo> {
        return this._http.get('/resource/vehicle/' + vehicleId);
    }

    updateEngineInfo(vehicleId: string, engine: Engine): Observable<Engine> {
        return this._http.post('/resource/engine/' + vehicleId, engine);
    }

    updateVehicleInfo(info: VehicleInfoFormModel): Observable<VehicleInfoFormModel> {
        return this._http.post('/resource/info', info);
    }

    updateTradeInfo(type: 'seller' | 'buyer', trade: Trade) {
        const url = type === 'seller' ? '/resource/buyer/' : '/resource/seller/';
        return this._http.post(url + trade.vehicleId, trade);
    }
}
