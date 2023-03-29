import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { VehicleService } from "../../../../core/stores/vehicle/vehicle.service";
import { Repair } from "../_core/repair.interface";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
import { RepairEditComponent } from "../repair-edit/repair-edit.component";
import { ConfirmService } from "../../../../shared/components/confirm/confirm.service";

@Component({
    selector: "va-repair-card",
    templateUrl: "./repair-card.component.html",
    styleUrls: ["./repair-card.component.scss"],
})
export class RepairCardComponent implements OnInit, OnDestroy {
    @Input() repair: Repair;
    @Output() onDelete = new EventEmitter();
    @Output() onUpdate = new EventEmitter();

    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    constructor(
        private _confirm: ConfirmService,
        private _vehicles: VehicleService,
        private _dialog: MatDialog
    ) {}

    ngOnInit() {
        this._vehicles.vehicle
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((v) => {
                this.units = v.info.units;
                this.units2 = v.info.subUnits;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    deleteConfirm() {
        this._confirm
            .open(
                "Servisní práce <i>" +
                    this.repair.title +
                    "</i> bude smazána i se souvisejícími údržbamy.",
                "Opravdu chceš smazat servisní práci?",
                "Ano, smazat"
            )
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((res) => {
                if (res) {
                    this.onDelete.emit(this.repair);
                }
            });
    }

    edit(event: MouseEvent) {
        this._dialog
            .open(RepairEditComponent, {
                width: "600px",
                data: this.repair,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.repair = res;
                }
            });
        event.preventDefault();
    }
}
