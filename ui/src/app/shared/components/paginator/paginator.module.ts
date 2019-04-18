import { NgModule } from '@angular/core';
import { PaginatorComponent } from './paginator.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [PaginatorComponent],
    declarations: [PaginatorComponent],
    providers: [],
})
export class PaginatorModule { }
