import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Observable } from 'rxjs';
import { Manual } from './manual.interface';

@Injectable()
export class ManualService {
    constructor(private _http: HttpService) {}

    getManuals(vehicleId: string): Observable<Manual[]> {
        return this._http.get(`/resource/manual/${vehicleId}/all`);
    }
}
