import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { RouterModule } from '@angular/router';
import { CardModule } from '../../../../../shared/components/card/card.module';
import { ProgressModule } from '../../../../../shared/components/progress/progress.module';
import { DirectivesModule } from '../../../../../shared/directives/directives.module';
import { PipesModule } from '../../../../../shared/pipes/pipes.module';
import { MaintenanceCardComponent } from './maintenance-card.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CardModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatMenuModule,
        DirectivesModule,
        PipesModule,
        ProgressModule,
        ReactiveFormsModule
    ],
    exports: [MaintenanceCardComponent],
    declarations: [MaintenanceCardComponent],
    providers: []
})
export class MaintenanceCardModule {}
