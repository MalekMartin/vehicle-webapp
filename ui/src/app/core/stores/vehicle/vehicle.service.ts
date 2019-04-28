import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Subjective } from 'subjective';
import { Engine, Vehicle, VehicleInfo } from '../../../vehicles/vehicle-stream/vehicle';
import { HttpService } from '../../http.service';
import { VehicleInfoFormModel } from './vehicle.interface';
import { VehicleState, vehicleStateFns } from './vehicle.state';
import { Trade } from '../../../shared/api/trade/trade';

@Injectable()
export class VehicleService {
    state = new Subjective(new VehicleState(), vehicleStateFns);

    constructor(private _http: HttpService) {}

    addVehicle(vehicle: Vehicle) {
        return this._http.post('/resource/vehicle/new', vehicle);
    }

    getInfo(id: string): Observable<VehicleInfo> {
        this.state.update(f => f.replaceLoading, true);
        return this._http.get<VehicleInfo>('/resource/info/' + id).pipe(
            tap((vehicle: VehicleInfo) => {
                this.state.update(f => f.replaceLoading, false);
            })
        );
    }

    deleteVehicle(vehicleId: string) {
        return this._http.delete('/resource/vehicle/' + vehicleId);
    }

    refresh(): Observable<Vehicle[]> {
        return this._http.get('/resource/vehicles');
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
