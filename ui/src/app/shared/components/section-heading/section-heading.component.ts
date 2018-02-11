import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'va-section-heading',
    styleUrls: ['./section-heading.component.scss'],
    template: `
        <h3>
            <div class="heading">
                <ng-content select="va-section-heading-title"></ng-content>
            </div>
            <div class="controls">
                <ng-content select="va-section-heading-controls"></ng-content>
            </div>
        </h3>
    `
})
export class SectionHeadingComponent { }

@Component({
    selector: 'va-section-heading-title',
    template: '<ng-content></ng-content>',
})
export class SectionHeadingTitleComponent { }

@Component({
    selector: 'va-section-heading-controls',
    template: '<ng-content></ng-content>',
})
export class SectionHeadingControlsComponent { }
