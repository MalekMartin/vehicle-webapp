import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ToastsManager } from 'ng6-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { Maintenance } from '../../../../shared/api/maintenance/maintenance.interface';
import { RepairEditComponent } from '../repair-edit/repair-edit.component';
import { RepairItemAddComponent } from '../repair-item-add/repair-item-add.component';
import { RepairItemEditComponent } from '../repair-item-edit/repair-item-edit.component';
import { RepairService } from '../repair.service';
import { RepairTask } from '../_core/repair-task.interface';
import { Repair } from '../_core/repair.interface';

@Component({
    selector: 'va-repair-detail',
    templateUrl: './repair-detail.component.html',
    styleUrls: ['./repair-detail.component.scss']
})
export class RepairDetailComponent implements OnInit, OnDestroy {
    @ViewChild('modal') modal: ModalDirective;

    expanded = false;
    repair: Repair;
    repairItems: { [key: string]: RepairTask[] } | null;
    maintenances: Maintenance[];
    loading = false;
    itemsLoading = false;

    private _repairId: string;
    private _limit = 5;

    private _onDestroy$ = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private _repairs: RepairService,
        private _dialog: MatDialog,
        private _vehicleService: VehicleService,
        private _toastr: ToastsManager
    ) {}

    ngOnInit() {
        this._route.params.subscribe(p => {
            if (p['id']) {
                this._repairId = p['id'];
                this.getRepair();
                this.getMaintenances();
                this.getRepairItems(this._repairId);
            }
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get limit() {
        return !this.expanded ? this._limit : -1;
    }

    get showMore() {
        return this.repair.tasks.length > this._limit;
    }

    getRepair() {
        this.loading = true;
        this._repairs
            .getRepair(this._repairId)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((r: Repair) => {
                this.repair = r;
                this.loading = false;
            });
    }

    getMaintenances() {
        this._repairs
            .getRelatedMaintenances(
                this._vehicleService.state.snapshot.vehicle.info.id,
                this._repairId
            )
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(m => {
                this.maintenances = m;
            });
    }

    getRepairItems(repairId: string) {
        this.itemsLoading = true;
        this._repairs
            .getRepairTasks(repairId)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onTasksSuccess, this._onTasksError);
    }

    onTaskSave() {
        this.getRepair();
    }

    edit() {
        this._dialog
            .open(RepairEditComponent, {
                width: '600px',
                data: this.repair
            })
            .afterClosed()
            .subscribe(res => {
                if (res) {
                    this.repair = res;
                }
            });
    }

    addItem() {
        this._dialog
            .open(RepairItemAddComponent, {
                width: '400px',
                data: this.repair
            })
            .afterClosed()
            .subscribe(v => {
                if (!!v) {
                }
            });
    }

    editItem(task: RepairTask) {
        this._dialog
            .open(RepairItemEditComponent, {
                width: '400px',
                data: { repair: this.repair, item: task }
            })
            .afterClosed()
            .subscribe(v => {
                if (!!v) {
                }
            });
    }

    private _onTasksSuccess = (t: RepairTask[]) => {
        this.repairItems = _.groupBy(t, (task: RepairTask) => {
            return task.type;
        });
        this.itemsLoading = false;
    };

    private _onTasksError = () => {
        this._toastr.error('Nepodařilo se načít položky opravy.', 'Chyba!');
        this.repairItems = null;
        this.itemsLoading = false;
    };
}
