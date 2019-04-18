import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import {
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [LoginComponent],
    declarations: [LoginComponent],
    providers: []
})
export class LoginModule {}
