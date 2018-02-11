import { Component, OnInit, Input } from '@angular/core';
import { Engine } from '../../_core/engine';
import { HttpService } from '../../../../core/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'va-engine',
    templateUrl: './engine.component.html',
    styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

    @Input() engine: Engine;

    engineEdit = false;

    constructor(private _http: HttpService, private _toastr: ToastsManager) { }

    ngOnInit() { }

    save(engine) {
        this._http
            .post('/resource/engine/' + engine.vehicleId, engine)
            .subscribe((e: Engine) => {
                this.engine = e;
                this.engineEdit = false;
                this._toastr.success('Úprava motoru byla úspěšně uložena.','Uloženo!');
                // this._toastr.success('Motor byl úspěšně editován', 'Uloženo!');
            });
    }

    cancel() {
        this.engineEdit = false;
    }
}
