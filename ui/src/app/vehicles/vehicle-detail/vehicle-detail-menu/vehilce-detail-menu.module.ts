import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleDetailMenuComponent } from './vehicle-detail-menu.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [VehicleDetailMenuComponent],
    declarations: [VehicleDetailMenuComponent],
    providers: [],
})
export class VehicleDetailMenuModule { }
