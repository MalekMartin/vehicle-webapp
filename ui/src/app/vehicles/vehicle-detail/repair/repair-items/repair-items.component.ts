import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    Output,
    EventEmitter,
} from "@angular/core";
import { Repair } from "../_core/repair.interface";
import { RepairService } from "../repair.service";
import { RepairTask } from "../_core/repair-task.interface";
import { ToastrService } from "ngx-toastr";
import * as _ from "lodash";
import { ConfirmService } from "../../../../shared/components/confirm/confirm.service";
import { switchMap, takeUntil } from "rxjs/operators";
import { EMPTY, Subject } from "rxjs";

@Component({
    selector: "va-repair-items",
    templateUrl: "./repair-items.component.html",
    styleUrls: ["./repair-items.component.scss"],
})
export class RepairItemsComponent implements OnInit, OnDestroy {
    @Input() repair: Repair;
    @Input() items: { [key: string]: RepairTask[] };

    @Output() editTask = new EventEmitter();
    @Output() updated = new EventEmitter();

    private onDestroy$ = new Subject();

    constructor(
        private _service: RepairService,
        private _toastr: ToastrService,
        private _confirm: ConfirmService
    ) {}

    ngOnInit() {}

    ngOnDestroy() {}

    deleteTask(task: RepairTask) {
        this._confirm
            .open(
                "Opravdu chceš smazat položku <b>" + task.title + "</b>?",
                "Odstranění položky",
                "Ano, smazat"
            )
            .pipe(
                switchMap((res) =>
                    !!res ? this._service.deleteTask(task) : EMPTY
                ),
                takeUntil(this.onDestroy$)
            )
            .subscribe(this._onDeleteSucess, this._onDeleteError);
    }

    private _onDeleteSucess = () => {
        this._toastr.success("Položka byla smazána.");
        this.updated.emit();
    };

    private _onDeleteError = () => {
        this._toastr.error("Položka nebyla odstraněna", "Chyba!");
    };
}
