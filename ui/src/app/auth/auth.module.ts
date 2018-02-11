import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ActivationComponent } from './activation/activation.component';
import { ActivationFormComponent } from './activation/activation-form/activation-form.component';
import { ActivationStatusComponent } from './activation/activation-status/activation-status.component';

const MODULES = [
    SharedModule
];

const COMPONENTS = [
    RegisterComponent,
    LoginComponent,
    ActivationComponent,
    ActivationFormComponent,
    ActivationStatusComponent
];

@NgModule({
    imports: [...MODULES],
    exports: [],
    declarations: [...COMPONENTS],
    providers: [],
})
export class AuthModule { }
