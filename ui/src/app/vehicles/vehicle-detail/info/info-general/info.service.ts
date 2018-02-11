import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class InfoService {

    constructor(private _http: HttpService) { }

    updateInfo(vehicle) {
        return this._http
            .post('/resource/info', vehicle);
    }
}
