import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { BsDropdownModule, DatepickerModule as BsDatepickerModule } from 'ngx-bootstrap';
import { DatepickerComponent } from './datepicker.component';

@NgModule({
    imports: [ReactiveFormsModule, PipesModule, BsDropdownModule, BsDatepickerModule],
    exports: [DatepickerComponent],
    declarations: [DatepickerComponent],
    providers: [],
})
export class DatepickerModule { }
