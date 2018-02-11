import { NgModule } from '@angular/core';
import { GarageService } from './garage.service';
import { GarageComponent } from './garage.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    exports: [GarageComponent],
    declarations: [GarageComponent],
    providers: [GarageService],
})
export class GarageModule { }
