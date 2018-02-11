import { ToastOptions } from 'ng2-toastr/ng2-toastr';

export class ToastCustomOption extends ToastOptions {
    animate = 'flyRight';
    positionClass: 'toast-top-right';
    newestOnTop = false;
    showCloseButton = true;
}
