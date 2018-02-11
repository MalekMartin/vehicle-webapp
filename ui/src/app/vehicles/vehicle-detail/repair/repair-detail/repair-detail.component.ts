import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepairService } from '../repair.service';
import { Repair } from '../_core/repair.interface';
import { HttpService } from '../../../../core/http.service';
import { RepairTask } from '../_core/repair-task.interface';
import { ConfirmDialogService } from '../../../../shared/components/confirm-dialog/confirm-dialog.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs/Subscription';
import { RepairFormService } from '../repair-form/repair-form.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'va-repair-detail',
    templateUrl: './repair-detail.component.html',
    styleUrls: ['./repair-detail.component.scss']
})

export class RepairDetailComponent implements OnInit, OnDestroy {

    @ViewChild('modal') modal: ModalDirective;

    expanded = false;

    selectedTask: RepairTask = null;

    private _limit = 5;
    private _repairId: string;
    private _repair: Repair;

    private _repairSubs: Subscription;

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _repairs: RepairService,
                private _http: HttpService,
                private _confirm: ConfirmDialogService,
                private _toastr: ToastsManager,
                private _repairForm: RepairFormService) {
    }

    ngOnInit() {

        this._route.params
            .subscribe(p => {
                if (p['id']) {
                    this._repairId = p['id'];
                    this.getRepair();
                }
            });
    }

    ngOnDestroy() {
        if (this._repairSubs) {
            this._repairSubs.unsubscribe();
        }
    }

    get repairId(): string {
        return this._repairId;
    }

    get repair(): Repair {
        return this._repair;
    }

    get limit() {
        return !this.expanded ? this._limit : -1;
    }

    get showMore() {
        return this.repair.tasks.length > this._limit;
    }

    getRepair() {
        this._repairSubs = this._repairs
            .getRepair(this._repairId)
            .subscribe((r: Repair) => {
                this._repair = r;
            });
    }

    onTaskSave() {
        this.getRepair();
        this.closeModal();
    }

    edit() {
        this._repairForm.dialog
            .repair(this._repair)
            .title('Editace opravy')
            .subscribe((res) => {
                if (res) {
                    // this.save(res.form);
                    this.getRepair();
                }
            });
    }

    addTask() {
        this.selectedTask = this._buildEmptyTask();
        this.modal.show();
    }

    editTask(task: RepairTask) {
        this.selectedTask = task;
        this.modal.show();
    }

    closeModal() {
        this.selectedTask = null;
        this.modal.hide();
    }

    private _buildEmptyTask(): RepairTask {
        return {
            id: '',
            repairId: this.repairId,
            title: '',
            note: '',
            quantity: 1,
            price: 0,
            priceNoTax: 0,
            type: 'MATERIAL',
        };
    }
}
