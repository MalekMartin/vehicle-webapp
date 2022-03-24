import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { HttpService } from "../../core/http.service";
import { Garage } from "../garage-form/garage-form.component";

@Injectable()
export class GarageService {
    private _garages: Garage[];

    constructor(private _http: HttpService) {}

    get garages(): Garage[] {
        return this._garages;
    }

    refresh() {
        this.getGarages().subscribe((g: Garage[]) => {});
    }

    getGarages() {
        return this._http
            .get<Garage[]>("/resource/garages")
            .pipe(tap((g) => (this._garages = g)));
    }

    addGarage(g: Garage) {
        return this._http.post("/resource/garages/add", g);
    }

    updateGarage(g: Garage) {
        return this._http.post("/resource/garages/update", g);
    }

    delete(g: Garage) {
        return this._http.delete("/resource/garages/" + g.id);
    }

    getGarage(id: string) {
        return this._http.get("/resource/garages/" + id);
    }

    getGarageRepairs(id: string) {
        return this._http.get("/resource/garages/" + id + "/repairs");
    }
}
