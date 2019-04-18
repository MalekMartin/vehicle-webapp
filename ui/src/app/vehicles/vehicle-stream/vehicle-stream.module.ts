import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule, DatepickerModule, ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SharedModule } from '../../shared/shared.module';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehicleEventComponent } from './vehicle-event/vehicle-event.component';
import { VehicleImageService } from './vehicle-images.service';
import { VehiclePreviewComponent } from './vehicle-preview/vehicle-preview.component';
import { VehicleStreamComponent } from './vehicle-stream.component';

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
    declarations: [...COMPONENTS],
    providers: [VehicleImageService]
})
export class VehicleStreamModule {}
