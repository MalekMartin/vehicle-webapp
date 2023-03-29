import { NgModule } from '@angular/core';
import { ActivationComponent } from './activation.component';
import { ActivationFormComponent } from './activation-form/activation-form.component';
import { ActivationStatusComponent } from './activation-status/activation-status.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormItemModule } from '../../shared/forms/form-item/form-item.module';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormItemModule
    ],
    exports: [ActivationComponent],
    declarations: [ActivationComponent, ActivationFormComponent, ActivationStatusComponent],
    providers: []
})
export class ActivationModule {}
