import { Component, OnDestroy, OnInit } from "@angular/core";
import { Service } from "../vehicle-repairs.service";
import { GarageService } from "../garage/garage.service";
import { Garage } from "../garage-form/garage-form.component";
import { ToastrService } from "ngx-toastr";
import { GarageAddComponent } from "../garage-add/garage-add.component";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
import { GarageEditComponent } from "../garage-edit/garage-edit.component";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
    selector: "va-car-service-list",
    templateUrl: "./car-service-list.component.html",
    styleUrls: ["./car-service-list.component.scss"],
})
export class CarServiceListComponent implements OnInit, OnDestroy {
    services: Service[];

    private onDestroy$ = new Subject();

    constructor(
        private _garages: GarageService,
        private _toastr: ToastrService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this._garages.refresh();
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
    }

    get garages() {
        return this._garages.garages;
    }

    add(e: MouseEvent) {
        e.preventDefault();
        this.dialog
            .open(GarageAddComponent)
            .afterClosed()
            .subscribe((v) => {
                if (v) {
                    this._garages.refresh();
                }
            });
    }

    edit(garage: Garage) {
        this.dialog
            .open(GarageEditComponent, {
                data: garage,
            })
            .afterClosed()
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((v) => {
                if (v) {
                    this._garages.refresh();
                }
            });
    }

    delete(garage: Garage) {
        this._garages
            .delete(garage)
            .subscribe(this._onDeleted, this._onDeleteError);
    }

    private _onDeleted = () => {
        this._garages.refresh();
    };

    private _onDeleteError = () => {
        this._toastr.error("Servis se nepdařilo smazat!");
    };
}
