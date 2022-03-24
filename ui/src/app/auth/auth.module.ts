import { NgModule } from '@angular/core';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ActivationModule } from './activation/activation.module';

@NgModule({
    imports: [RegisterModule, LoginModule, ActivationModule],
    exports: [],
    declarations: [],
    providers: []
})
export class AuthModule {}
