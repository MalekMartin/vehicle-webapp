import { NgModule } from '@angular/core';
import { MaintenanceCardComponent } from './maintenance-card.component';
import { CardModule } from '../../../../../shared/components/card/card.module';
import { MatCheckboxModule, MatTooltipModule } from '@angular/material';
import { DirectivesModule } from '../../../../../shared/directives/directives.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ProgressModule } from '../../../../../shared/components/progress/progress.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../../../../shared/pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CardModule,
        MatCheckboxModule,
        MatTooltipModule,
        DirectivesModule,
        PipesModule,
        BsDropdownModule,
        ProgressModule,
        ReactiveFormsModule
    ],
    exports: [MaintenanceCardComponent],
    declarations: [MaintenanceCardComponent],
    providers: []
})
export class MaintenanceCardModule {}
