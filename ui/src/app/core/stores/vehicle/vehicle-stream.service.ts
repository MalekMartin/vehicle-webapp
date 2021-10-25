import { Injectable } from "@angular/core";
import { HttpService } from "../../http.service";
import { Vehicle } from "../../../vehicles/vehicle-stream/vehicle";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class VehicleStreamService {

    private _vehicles$ = new BehaviorSubject<Vehicle[]>(null);
    private _loading$ = new BehaviorSubject<boolean>(false);

    readonly vehicles$ = this._vehicles$.asObservable();
    readonly loading$ = this._loading$.asObservable();

    constructor(private _http: HttpService) {}

    get vehicles() {
        return this._vehicles$.value;
    }

    get loading() {
        return this._loading$.value;
    }

    addVehicle(vehicle: Vehicle) {
        return this._http.post("/resource/vehicle/new", vehicle);
    }

    deleteVehicle(vehicleId: string) {
        return this._http.delete("/resource/vehicle/" + vehicleId);
    }

    refresh(): Observable<Vehicle[]> {
        this._loading$.next(true);
        return this._http.get<Vehicle[]>("/resource/vehicles").pipe(
            tap(
                (vehicles) => {
                    this._loading$.next(false);
                    this._vehicles$.next(vehicles);
                },
                () => this._loading$.next(false)
            )
        );
    }

    updateVehicleStream(vehicles: Vehicle[]) {
        this._vehicles$.next(vehicles);
    }
}
