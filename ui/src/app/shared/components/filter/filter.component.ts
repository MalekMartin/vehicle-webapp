import { Component, Input } from '@angular/core';

@Component({
    selector: 'va-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
    @Input() title: string;
}
