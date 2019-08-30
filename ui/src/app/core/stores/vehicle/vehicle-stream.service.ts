import { Injectable } from '@angular/core';
import { VehicleStreamState, vehicleStreamStateFns } from './vehicle-stream.state';
import { Subjective } from 'subjective';
import { HttpService } from '../../http.service';
import { Vehicle } from '../../../vehicles/vehicle-stream/vehicle';
import { Observable } from 'rxjs';

@Injectable()
export class VehicleStreamService {
    state = new Subjective(new VehicleStreamState(), vehicleStreamStateFns);

    constructor(private _http: HttpService) {}

    addVehicle(vehicle: Vehicle) {
        return this._http.post('/resource/vehicle/new', vehicle);
    }

    deleteVehicle(vehicleId: string) {
        return this._http.delete('/resource/vehicle/' + vehicleId);
    }

    refresh(): Observable<Vehicle[]> {
        return this._http.get('/resource/vehicles');
    }
}
