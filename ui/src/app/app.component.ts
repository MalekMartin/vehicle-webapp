import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

@Component({
    selector: 'va-app',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    viewContainerRef: ViewContainerRef;

    constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
        this.toastr.setRootViewContainerRef(viewContainerRef);
    }
}
