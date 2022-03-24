import { NgModule } from '@angular/core';
import { GarageService } from './garage.service';
import { GarageComponent } from './garage.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [GarageComponent],
    declarations: [GarageComponent],
    providers: [GarageService],
})
export class GarageModule { }
