import { NgModule } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ReactiveFormsModule, CommonModule],
    exports: [CheckboxComponent],
    declarations: [CheckboxComponent],
    providers: [],
})
export class CheckboxModule { }
