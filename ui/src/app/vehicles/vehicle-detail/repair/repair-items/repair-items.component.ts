import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Repair } from '../_core/repair.interface';
import { RepairService } from '../repair.service';
import { RepairTask } from '../_core/repair-task.interface';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from '../../../../shared/components/confirm-dialog/confirm-dialog.service';
import * as _ from 'lodash';

@Component({
    selector: 'va-repair-items',
    templateUrl: './repair-items.component.html',
    styleUrls: ['./repair-items.component.scss']
})
export class RepairItemsComponent implements OnInit, OnDestroy {
    @Input() repair: Repair;
    @Input() items: { [key: string]: RepairTask[] };

    @Output() editTask = new EventEmitter();

    constructor(
        private _service: RepairService,
        private _toastr: ToastrService,
        private _confirm: ConfirmDialogService
    ) {}

    ngOnInit() {}

    ngOnDestroy() {}

    deleteTask(task: RepairTask) {
        this._confirm.dialog
            .title('Odstranění položky')
            .message('Opravdu chceš smazat položku <b>' + task.title + '</b>?')
            .ok('Ano, smazat')
            .cancel('Zrušit')
            .subscribe(res => {
                if (res) {
                    this._service
                        .deleteTask(task)
                        .subscribe(this._onDeleteSucess, this._onDeleteError);
                }
            });
    }

    private _onDeleteSucess = () => {
        this._toastr.success('Položka byla smazána.');
    };

    private _onDeleteError = () => {
        this._toastr.error('Položka nebyla odstraněna', 'Chyba!');
    };
}
