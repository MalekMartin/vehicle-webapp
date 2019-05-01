import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'va-spinner',
    template: `
        <div class="spinner-wrapper">
            <i class="spinner icon-spinner2"></i>
        </div>
        <div class="spinner-content">
            <ng-content></ng-content>
        </div>`,
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {}
