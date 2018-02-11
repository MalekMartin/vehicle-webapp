import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Repair } from '../_core/repair.interface';
import { RepairService } from '../repair.service';
import { RepairTask } from '../_core/repair-task.interface';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs/Subscription';
import { ConfirmDialogService } from '../../../../shared/components/confirm-dialog/confirm-dialog.service';

@Component({
    selector: 'va-repair-tasks',
    templateUrl: './repair-tasks.component.html',
    styleUrls: ['./repair-tasks.component.scss']
})

export class RepairTasksComponent implements OnInit, OnDestroy {

    @Input()
    set repair(r: Repair) {
        if (r) {
            this._repair = r;
            this.getTasks(r.id);
        }
    }

    @Output() editTask = new EventEmitter();

    tasks: RepairTask[];
    loading = true;

    private _repair: Repair;
    private _tasksSubs: Subscription;

    constructor(private _service: RepairService,
                private _toastr: ToastsManager,
                private _confirm: ConfirmDialogService) { }

    ngOnInit() {}

    ngOnDestroy() {
        if (this._tasksSubs) {
            this._tasksSubs.unsubscribe();
        }
    }

    get repair(): Repair {
        return this._repair;
    }

    getTasks(repairId: string) {
        this.loading = true;
        this._tasksSubs = this._service
            .getRepairTasks(repairId)
            .subscribe(this._onTasksSuccess, this._onTasksError);
    }

    deleteTask(task: RepairTask) {
        this._confirm.dialog
            .title('Odstranění položky')
            .message('Opravdu chceš smazat položku <b>' + task.title + '</b>?')
            .ok('Ano, smazat')
            .cancel('Zrušit')
            .subscribe((res) => {
                if (res) {
                    this._service
                        .deleteTask(task)
                        .subscribe(this._onDeleteSucess, this._onDeleteError);
                }
            });
    }

    // deleteTask(task: RepairTask) {
    //     this._service.deleteTask(task)
    //         .subscribe(this._onDeleteSucess, this._onDeleteError);
    // }

    private _onTasksSuccess = (t: RepairTask[]) => {
        this.tasks = t;
        this.loading = false;
    }

    private _onTasksError = () => {
        this._toastr.error('Nepodařilo se načíst detail opravy');
        this.loading = false;
    }

    private _onDeleteSucess = () => {
        this._toastr.success('Položka byla smazána.');
        this.getTasks(this.repair.id);
    }

    private _onDeleteError = () => {
        this._toastr.error('Položka nebyla odstraněna', 'Chyba!');
    }
}
