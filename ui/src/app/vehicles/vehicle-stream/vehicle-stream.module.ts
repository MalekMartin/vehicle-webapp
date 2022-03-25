import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { CardModule } from '../../shared/components/card/card.module';
import { InitialsModule } from '../../shared/components/initials/initials.module';
import { FormItemModule } from '../../shared/forms/form-item/form-item.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehicleDeleteConfirmComponent } from './vehicle-delete-confirm/vehicle-delete-confirm.component';
import { VehicleEventComponent } from './vehicle-event/vehicle-event.component';
import { VehicleImageService } from './vehicle-images.service';
import { VehiclePreviewComponent } from './vehicle-preview/vehicle-preview.component';
import { VehicleStreamComponent } from './vehicle-stream.component';
import { ErrorStateMatcher } from '@angular/material/core';

const MODULES = [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule,
    PipesModule,
    FormItemModule,
    CardModule,
    InitialsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule
];

const COMPONENTS = [
    VehicleStreamComponent,
    VehicleAddComponent,
    VehiclePreviewComponent,
    VehicleEventComponent,
    VehicleCardComponent,
    VehicleDeleteConfirmComponent
];

@NgModule({
    imports: [...MODULES],
    exports: [VehicleStreamComponent],
    declarations: [...COMPONENTS],
    providers: [
        VehicleImageService,
        ErrorStateMatcher
    ],
    entryComponents: [VehicleAddComponent, VehicleDeleteConfirmComponent]
})
export class VehicleStreamModule {}
