import { NgModule } from '@angular/core';
import { InitialsComponent } from './initials.component';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    imports: [CommonModule, DirectivesModule],
    exports: [InitialsComponent],
    declarations: [InitialsComponent],
    providers: [],
})
export class InitialsModule { }
