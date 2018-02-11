import { NgModule } from '@angular/core';
import { CostsService } from './costs/costs.service';
import { FuelService } from './fuel/fuel.service';
import { MaintenanceService } from './maintenance/maintenance.service';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        CostsService,
        FuelService,
        MaintenanceService,
    ],
})
export class ApiModule { }
