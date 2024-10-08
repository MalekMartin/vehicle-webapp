import {
    Component,
    OnInit,
    OnDestroy,
    EventEmitter,
    Output,
} from "@angular/core";
import { Subject } from "rxjs";
import { Page } from "../../../../utils/pageable";
import { UntypedFormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { VehicleService } from "../../../../core/stores/vehicle/vehicle.service";
import { Interval } from "../../../../shared/api/maintenance/interval.interface";
import { Maintenance } from "../../../../shared/api/maintenance/maintenance.interface";
import { MaintenanceService } from "../../../../shared/api/maintenance/maintenance.service";
import { takeUntil } from "rxjs/operators";
import { ConfirmService } from "../../../../shared/components/confirm/confirm.service";

@Component({
    selector: "va-maintenances",
    templateUrl: "./maintenance.component.html",
    styleUrls: ["./maintenance.component.scss"],
})
export class MaintenanceComponent implements OnInit, OnDestroy {

    @Output() finishMaintenance = new EventEmitter<Maintenance[]>();
    @Output() editMaintenance = new EventEmitter<Maintenance>();
    @Output() refreshAll = new EventEmitter();

    action: string = null;

    maintenanceAction: boolean;

    vehicleId: string;
    intervals: Interval[];
    maintenances: MaintenanceSelectable[];
    now = 5;
    doneSelected: Maintenance;
    selectedMaintenance: Maintenance;
    status = "IN_PROGRESS";

    selected: Maintenance[] = [];

    statuses = [
        { key: "", label: "všechny stavy" },
        { key: "IN_PROGRESS", label: "Probíhající" },
        { key: "CANCELED", label: "Zrušené" },
        { key: "DONE", label: "Dokončené" },
    ];

    form = this._fb.group({
        status: [],
        interval: [],
    });

    private _onDestroy$ = new Subject();

    constructor(
        private _maintenance: MaintenanceService,
        private _fb: UntypedFormBuilder,
        private _confirm: ConfirmService,
        private _toastr: ToastrService,
        private _vehicles: VehicleService
    ) {}

    ngOnInit() {
        this.vehicleId = this._vehicles.snapshot.info.id;
        if (!!this.vehicleId) {
            this._maintenance.vehicleId = this.vehicleId;
        }

        this._maintenance.state
            .select((s) => s.maintenances)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._handleNewContent);

        this.form.valueChanges
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(s => {
                this._maintenance.reset();
                this._maintenance.filter = s;
                this.fetchCurrentPage();
            });

        this.form.setValue({
            status: this.statuses[1].key,
            interval: ''
        });

        this._maintenance.intervalsSubject
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((i) => {
                this.intervals = i;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get maintenanceService() {
        return this._maintenance;
    }

    get hasSelection() {
        return this.selected.length > 0;
    }

    get canFinish() {
        return (
            !!this.selected &&
            !!this.selected.length &&
            !this.selected.filter((m) => m.status !== "IN_PROGRESS").length
        );
    }

    get canCancel() {
        return (
            !!this.selected &&
            this.selected.length &&
            !this.selected.find((m) => m.status !== "IN_PROGRESS")
        );
    }

    get itemsFormatLabel() {
        if (this.selected.length === 1) {
            return "položku";
        } else if (this.selected.length > 1 && this.selected.length < 5) {
            return "položky";
        } else {
            return "položek";
        }
    }

    fetchCurrentPage() {
        this._maintenance
            .fetchCurrentPage()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe();
    }

    setFilters() {
        this._maintenance.filter = {
            status: this.form.get("status").value,
            interval: this.form.get("interval").value,
        };
    }

    setAction(a) {
        this.maintenanceAction = a;

        if (!a) {
            this.selected = [];
            this.maintenances.forEach((v) => {
                v.selected = false;
            });
        }
    }

    selectionChanged(m: Maintenance, value: boolean) {
        if (value) {
            this._addToSelected(m);
        } else {
            this._removeFromSelected(m);
        }
    }

    confirmDelete() {
        this._confirm
            .open(
                "Opravdu chceš smazat <b>" +
                    this.selected.length +
                    "</b> " +
                    this.itemsFormatLabel +
                    " údržby?",
                "Smazat údržbu",
                "Ano, smazat"
            )
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((res) => {
                if (res) {
                    this.delete();
                }
            });
    }

    confirmMaintenanceCancel() {
        this._confirm
            .open(
                "Opravdu chceš ukončit <b>" +
                    this.selected.length +
                    "</b> " +
                    this.itemsFormatLabel +
                    " údržby?",
                "Ukončit údržbu",
                "Ano, ukončit"
            )
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((res) => {
                if (res) {
                    this.cancelMaintenances();
                }
            });
    }

    delete() {
        const ids = this.selected.map((m) => m.id);
        this._maintenance
            .deleteMaintenance(ids)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    cancelMaintenances() {
        const ids = this.selected.map((m) => m.id);
        this._maintenance
            .cancelMaintenance(ids)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onCancelSuccess, this._onCancelError);
    }

    fetchPage(p: number) {
        this.setFilters();
        this._maintenance
            .fetchPage(p)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._handleNewContent);
    }

    openFinishDialog() {
        this.finishMaintenance.emit(this.selected);
    }

    private _addToSelected(m: Maintenance) {
        this.selected = [...this.selected, m];
    }

    private _removeFromSelected(m: Maintenance) {
        this.selected = this.selected.filter((s) => s.id !== m.id);
    }

    private _onCancelSuccess = () => {
        this._toastr.success("Údržba byla úspěšně zrušena.");
        this.refreshAll.emit();
        this.setAction(false);
    };

    private _onCancelError = () => {
        this._toastr.error("Vybrané intervaly nebyly zrušeny.", "Chyba!");
    };

    private _onDeleteSuccess = () => {
        this._toastr.success("Údržba byla úspěšně smazána.");
        this.refreshAll.emit();
        this.setAction(false);
    };

    private _onDeleteError = () => {
        this._toastr.error("Chyba.");
    };

    private _handleNewContent = (m: Page<Maintenance>) => {
        this.maintenances = !!m
            ? m.content.map((v) => {
                  return {
                      ...v,
                      selected: !!this.selected.find((s) => s.id === v.id),
                  };
              })
            : [];
    };
}

interface MaintenanceSelectable extends Maintenance {
    selected: boolean;
}
