import { NgModule } from '@angular/core';
import { MileageComponent } from './mileage.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    imports: [CommonModule, PipesModule],
    exports: [MileageComponent],
    declarations: [MileageComponent],
    providers: [],
})
export class MileageModule { }
