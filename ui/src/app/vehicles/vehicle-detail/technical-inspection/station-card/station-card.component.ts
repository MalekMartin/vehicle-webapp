import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Station } from '../station.interface';
import { TechnicalInspectionService } from '../technical-inspection.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { ConfirmDialogService } from '../../../../shared/components/confirm-dialog/confirm-dialog.service';

@Component({
    selector: 'va-station-card',
    templateUrl: './station-card.component.html',
    styleUrls: ['./station-card.component.scss']
})
export class StationCardComponent implements OnInit {

    @Input() station: Station;
    @Output() deleted = new EventEmitter();

    constructor(private _service: TechnicalInspectionService,
                private _toastr: ToastsManager,
                private _dialog: ConfirmDialogService) { }

    ngOnInit() { }

    onDelete(s: Station) {
        this._dialog.dialog
            .title('Smazat STK')
            .message('Opravdu chceš smazat STK <b>' + s.name + '</b>?')
            .ok('Ano, smazat')
            .cancel('Ne')
            .subscribe((res: boolean) => {
                if (res) {
                    this.delete(s);
                }
            });
    }

    delete(s: Station) {
        this._service
            .deleteStation(s)
            .subscribe((station: Station) => {
                this._toastr.success('Stanice technické kontroly <strong>'
                    + station.name + '</strong> byla smazána','Smazáno');
                this.deleted.emit();
            });
    }

}
