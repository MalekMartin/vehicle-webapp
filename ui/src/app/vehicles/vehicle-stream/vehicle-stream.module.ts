import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../core/auth.service';
import { VehicleService } from './vehicle.service';
import { VehicleStreamComponent } from './vehicle-stream.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehiclePreviewComponent } from './vehicle-preview/vehicle-preview.component';
import { VehicleEventComponent } from './vehicle-event/vehicle-event.component';
import { VehicleImageService } from './vehicle-images.service';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const MODULES = [
    RouterModule,
    DatepickerModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalModule,
    TooltipModule
];

const COMPONENTS = [
    VehicleStreamComponent,
    VehicleAddComponent,
    VehiclePreviewComponent,
    VehicleEventComponent,
    VehicleCardComponent
];

@NgModule({
    imports: [...MODULES],
    exports: [VehicleStreamComponent],
    declarations: [
        ...COMPONENTS
    ],
    providers: [
        VehicleService,
        VehicleImageService,
    ],
})
export class VehicleStreamModule { }
