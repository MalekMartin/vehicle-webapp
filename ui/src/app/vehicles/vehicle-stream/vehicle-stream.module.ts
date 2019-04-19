import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule, DatepickerModule, ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehicleEventComponent } from './vehicle-event/vehicle-event.component';
import { VehicleImageService } from './vehicle-images.service';
import { VehiclePreviewComponent } from './vehicle-preview/vehicle-preview.component';
import { VehicleStreamComponent } from './vehicle-stream.component';
import {
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    ErrorStateMatcher,
    ShowOnDirtyErrorStateMatcher,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { FormItemModule } from '../../shared/forms/form-item/form-item.module';
import { InitialsModule } from '../../shared/components/initials/initials.module';
import { CardModule } from '../../shared/components/card/card.module';
import { VehicleDeleteConfirmComponent } from './vehicle-delete-confirm/vehicle-delete-confirm.component';

const MODULES = [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DatepickerModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    TooltipModule,
    MatDialogModule,
    MatTooltipModule,
    PipesModule,
    FormItemModule,
    CardModule,
    InitialsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
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
        // { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
    ],
    entryComponents: [VehicleAddComponent, VehicleDeleteConfirmComponent]
})
export class VehicleStreamModule {}
