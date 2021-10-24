import { ToastOptions } from 'ng6-toastr/ng2-toastr';
import { Injectable } from "@angular/core";

@Injectable()
export class ToastCustomOption extends ToastOptions {
    animate = 'flyRight';
    positionClass: 'toast-top-right';
    newestOnTop = false;
    showCloseButton = true;
}
