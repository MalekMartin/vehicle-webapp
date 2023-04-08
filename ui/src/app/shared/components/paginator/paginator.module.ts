import { NgModule } from '@angular/core';
import { PaginatorComponent } from './paginator.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatIconModule],
    exports: [PaginatorComponent],
    declarations: [PaginatorComponent],
    providers: [],
})
export class PaginatorModule { }
