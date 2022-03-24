import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'va-app',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    viewContainerRef: ViewContainerRef;

    constructor(public toastr: ToastrService, viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
        // this.toastr.setRootViewContainerRef(viewContainerRef);
    }
}
