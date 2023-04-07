import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MenuOption } from "./vehicle-detail-menu.interface";

@Component({
    selector: "va-vehicle-detail-menu",
    templateUrl: "vehicle-detail-menu.component.html",
    styleUrls: ["./vehicle-detail-menu.component.scss"],
})
export class VehicleDetailMenuComponent {
    @Input() vehicleId: string;

    @Output() navigated = new EventEmitter<void>();

    options: MenuOption[] = [
        { page: "dashboard", label: "Přehled", warning: 0, icon: "stats" },
        { page: "info", label: "Info", warning: 0, icon: "info" },
        { page: "fuel", label: "Tankování", warning: 0, icon: "gas" },
        { page: "costs", label: "Náklady", warning: 0, icon: "money" },
        { page: "tires", label: "Pneu", warning: 0, icon: "radio-unchecked" },
        { page: "technical", label: "TK", warning: 0, icon: "verified" },
        { page: "maintenance", label: "Údržba", warning: 0, icon: "wrench" },
        {
            page: "repairs",
            label: "Servisí práce",
            warning: 0,
            icon: "automobile",
        },
        { page: "manuals", label: "Manuály", warning: 0, icon: "database" },
        { page: "settings", label: "Nastavení", warning: 0, icon: "settings" },
    ];
}
