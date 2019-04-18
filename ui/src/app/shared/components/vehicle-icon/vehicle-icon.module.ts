import { NgModule } from '@angular/core';
import { VehicleIconComponent } from './vehicle-icon.component';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    imports: [DirectivesModule],
    exports: [VehicleIconComponent],
    declarations: [VehicleIconComponent],
    providers: []
})
export class VehicleIconModule {}
