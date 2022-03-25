import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Engine, VehicleInfo } from "../../../vehicles/vehicle-stream/vehicle";
import { HttpService } from "../../http.service";
import { VehicleInfoFormModel } from "./vehicle.interface";
import { Trade } from "../../../shared/api/trade/trade";

@Injectable({providedIn: 'root'})
export class VehicleService {
    private _vehicle$ = new BehaviorSubject<VehicleInfo | null>(null);
    private _loading$ = new BehaviorSubject<boolean>(false);

    readonly vehicle = this._vehicle$.asObservable();
    readonly loading = this._loading$.asObservable();

    constructor(private _http: HttpService) {}

    get snapshot() {
        return this._vehicle$.value;
    }

    getInfo(id: string): Observable<VehicleInfo> {
        this._loading$.next(true);
        return this._http.get<VehicleInfo>("/resource/info/" + id).pipe(
            tap(
                (info) => {
                    this._loading$.next(false);
                    this._vehicle$.next(info);
                },
                () => this._loading$.next(false)
            )
        );
    }

    getLastEvents() {
        return this._http.get("/resource/vehicle/last-events");
    }

    getVehicleDetail(vehicleId: string): Observable<VehicleInfo> {
        return this._http.get("/resource/vehicle/" + vehicleId);
    }

    updateEngineInfo(vehicleId: string, engine: Engine): Observable<Engine> {
        return this._http.post("/resource/engine/" + vehicleId, engine);
    }

    updateVehicleInfo(
        info: VehicleInfoFormModel
    ): Observable<VehicleInfoFormModel> {
        return this._http.post("/resource/info", info);
    }

    updateTradeInfo(type: "seller" | "buyer", trade: Trade) {
        const url =
            type === "seller" ? "/resource/buyer/" : "/resource/seller/";
        return this._http.post(url + trade.vehicleId, trade);
    }

    updateVehicleSubject(vehicle: VehicleInfo) {
        this._vehicle$.next(vehicle);
    }
}
